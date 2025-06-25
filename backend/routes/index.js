const { Router } = require("express")
const accountRouter = require('./account')
const userRouter = require('./user')
const authMiddleware = require('../middlewares/Jwtauth')
const router = Router()
const { User } = require('../db')
const { UserUpdate } = require('../middlewares/zodSchema')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../secret')

router.use('/user', userRouter)
router.use('/account', accountRouter)
router.put('/update', authMiddleware, async (req, res) => {
    const newupdate = req.body
    const validated = UserUpdate.safeParse(newupdate)
    if (!validated.success) {
        return res.status(400).json({
            message: "Wrong Input",
            issues: validated.error.errors
        })
    } else {
        await User.updateOne(
            { username: req.username },
            { $set: validated.data }
        );
        return res.status(200).json({
            message: "Update Successfully"
        })

    }

})

router.get('/check', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "No Access" });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "No Access" });
        }else{
            return res.status(200).json({error:"Access"})
        }
    })




})
module.exports = router