const express = require('express')
const mongoose = require('mongoose')
const authMiddleware = require('../middlewares/Jwtauth')
const { Transaction } = require('../middlewares/zodSchema')
const { User, Account, } = require('../db')
const crypto = require('crypto');

const accountRouter = express.Router()

accountRouter.get('/balance', authMiddleware, async (req, res) => {
    const username = req.username
    try {
        const user = await User.findOne({ username: username })
        if (user) {
            const account = await Account.findOne({ userId: user._id })
            return res.status(200).json({
                "balance": account.balance
            })
        }


    } catch (e) {
        return res.status(401).json({
            "message": "Database Failed"
        })
    }
})
accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    function generateTransactionId(senderId) {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // e.g., '20250625'
        const random = crypto.randomBytes(3).toString('hex'); // 6-character random hex
        return `TXN-${senderId.toString().slice(-6)}-${date}-${random}`;
    }

    async function historyto(type, from, to, amount, date, time, message, status) {
        const fromuser = await User.findById(from)
        const touser = await User.findById(to)

        await Account.findOneAndUpdate({ userId: to }, {
            $push: {
                transactions: {
                    invoiceid: generateTransactionId(from),
                    which: type,
                    from: `${fromuser.firstname} ${fromuser.lastname}`,
                    to: `${touser.firstname} ${touser.lastname}`,
                    amount: amount,
                    date: date,
                    time: time,
                    message: message,
                    status: status
                }
            }
        }
        )
    }
    async function history(type, from, to, amount, date, time, message, status) {
        const fromuser = await User.findById(from)
        const touser = await User.findById(to)

        await Account.findOneAndUpdate({ userId: from }, {
            $push: {
                transactions: {
                    invoiceid: generateTransactionId(from),
                    which: type,
                    from: `${fromuser.firstname} ${fromuser.lastname}`,
                    to: `${touser.firstname} ${touser.lastname}`,
                    amount: amount,
                    date: date,
                    time: time,
                    message: message,
                    status: status
                }
            }
        }
        )
    }
    const body = req.body
    const validate = Transaction.safeParse(body)
    const username = req.username
    const user = await User.findOne({ username })
    if (!validate.success) {
        await history('sended', user._id, body.to, validate.data.amount, date, time, 'Something Went Wrong', 'failed')
        return res.status(400).json({
            message: "Something Went Wrong",
            error: validate.error
        })
    } else {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const account = await Account.findOne({ userId: user._id }).session(session);
            if (!account || account.balance < validate.data.amount) {
                await history('sended', user._id, validate.data.to, validate.data.amount, date, time, 'Not Enough Balance', 'failed')
                return res.status(400).json({
                    message: "Not Enough Balance"
                })
            }
            const toaccount = await Account.findOne({ userId: validate.data.to }).session(session);
            if (!toaccount) {
                await history('sended', user._id, validate.data.to, validate.data.amount, date, time, 'Something Went Wrong', 'failed')
                return res.status(401).json({
                    message: "Something Went Wrong"
                })
            }
            const amount = validate.data.amount
            if (user._id == validate.data.to) {
                history('sended', user._id, validate.data.to, validate.data.amount, date, time, 'Cannot Transfer Money To Yourself', 'failed')
                return res.status(401).json({
                    message: "Cannot Transfer Money To Yourself"
                })
            }
            if (amount == 0) {
                await history('sended', user._id, validate.data.to, validate.data.amount, date, time, 'Cannot Tranfer Zero(0) Amount', 'failed')
                return res.status(401).json({
                    message: "Cannot Tranfer Zero(0) Amount"
                })
            }
            await Account.updateOne({ userId: user._id }, { $inc: { balance: -amount } }).session(session);
            await Account.updateOne({ userId: validate.data.to }, { $inc: { balance: amount } }).session(session);
            await session.commitTransaction();
            await historyto('recieved', user._id, validate.data.to, validate.data.amount, date, time, 'Transfer Succesfull', 'success')
            await history('sended', user._id, validate.data.to, validate.data.amount, date, time, 'Transfer Succesfull', 'success')
            return res.json({
                message: "Transfer successful"
            });
        } catch (e) {
            await session.abortTransaction();
            res.status(400).json({
                "message": e.message
            })
        } finally {
            session.endSession();

        }

    }
})
accountRouter.get('/history', authMiddleware, async (req, res) => {
    const username = req.username
    const user = await User.findOne({ username: username })
    const account = await Account.findOne({ userId: user._id })
    res.status(200).json({
        data: account.transactions
    })
})
accountRouter.post('/delete', authMiddleware, async (req, res) => {
    const username = req.username
    const invoiceid = req.body.id

    try {
        const user = await User.findOne({ username: username })
        await Account.updateOne({ userId: user._id }, {
            $pull: {
                transactions: { invoiceid: invoiceid }
            }

        })
        res.status(200).json({ "message": "Done" })
    } catch (e) {
        return res.status(400).json({ e })
    }


})
module.exports = accountRouter;
