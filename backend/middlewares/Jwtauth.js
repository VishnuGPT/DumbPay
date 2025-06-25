const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require('../secret')
function authMiddleware(req, res, next) {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authorization header missing or invalid" });
    }
    else{
        const token= auth.split(" ")[1]
        try{const decode = jwt.verify(token,JWT_SECRET) 
            req.username = decode.username
            next()
        }catch(error){
            res.status(401).json({
                message: "Authorization header missing or invalid", 
                issue:error
            })
        }
        
    }

}
module.exports =  authMiddleware 
