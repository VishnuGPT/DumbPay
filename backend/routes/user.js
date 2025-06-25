const { Router } = require("express")


const z = require("zod")
const router = Router()
const { UserSignupVal, UserSigninVal } = require('../middlewares/zodSchema')
const { User, Account } = require('../db')
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require('../secret')
const authMiddleware = require("../middlewares/Jwtauth")

router.post('/signup', async (req, res) => {
    const body = req.body
    const result = UserSignupVal.safeParse(body)
    if (!result.success) {
        return res.status(400).json({
            message: "Incorrect inputs",
            issues: result.error.errors
        });
    } else {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already taken"
            })
        } else {
            try {
                const newuser = new User(result.data)
                await newuser.save()
                const newaccount = new Account({
                    "userId": newuser._id,
                    "balance": Math.floor(Math.random() * 1000) + 1
                })
                await newaccount.save()
                const token = jwt.sign({ username: result.data.username }, JWT_SECRET)
                return res.status(201).json({
                    message: "User created successfully",
                    token: token
                })
            } catch (e) {
                return res.status(400).json({
                    "message": e
                })
            }
        }
    }
})

router.post('/signin', async (req, res) => {
    const body = req.body
    const result = UserSigninVal.safeParse(body)
    if (!result.success) {
        return res.status(411).json({
            message: "Wrong Inputs"
        })
    } else {
        const user = await User.findOne({ username: result.data.username })
        if (user) {
            if (user.password == result.data.password) {
                const token = jwt.sign({ username: result.data.username }, JWT_SECRET)
                return res.status(200).json({
                    token: token
                })
            } else {
                return res.status(401).json({
                    message: "Wrong Password"
                })
            }

        } else {
            return res.status(401).json({
                message: "No Email Found"
            })
        }

    }

})

router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter
    try {
        const users = await User.find({
            $or: [
                { firstname: { $regex: filter, $options: "i" } },
                { lastname: { $regex: filter, $options: "i" } }
            ]
        }).select('firstname lastname _id');
        return res.status(200).json({
            "users": users
        })
    } catch (e) {
        return res.status(400).json({
            "message": "User Not Found",
            "error": e
        })

    }

})
router.get('/userinfo', authMiddleware, async (req, res) => {
    const username = req.username
    try {
        const user = await User.findOne({ username: username }).select('firstname lastname')
        res.status(200).json({ user })
    }catch (e) { res.status(400).json(e) }

})

module.exports = router