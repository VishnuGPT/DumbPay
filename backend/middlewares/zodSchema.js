const z = require("zod");

const UserSignupVal = z.object({
	username: z.string().email(),
	firstname:z.string(),
	lastname: z.string().optional(),
	password: z.string().min(6,"Password must be at least 6 characters")
})
const UserSigninVal = z.object({
    username:z.string().email(),
    password:z.string()
})
const UserUpdate= z.object({
	firstname:z.string().min(3).optional(),
	lastname: z.string().optional(),
	password: z.string().min(6,"Password must be at least 6 characters").optional()
})
const Transaction= z.object({
    to:z.string(),
    amount:z.number()
})
module.exports={
    UserSignupVal,
    UserSigninVal,
    UserUpdate,
    Transaction,
    
}