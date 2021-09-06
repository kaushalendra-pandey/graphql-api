const jwt = require("jsonwebtoken")

module.exports.authMiddleware = (req,res,next) => {
    const reqHeader = req.get("Authorization")
    if(!reqHeader){
        console.log("here")
        req.isAuth = false
        console.log()
        return next()
    }

    const token = reqHeader.split(" ")[1]
    let decodeToken;
    try {
        decodeToken = jwt.verify(token,'bcacbacbnqucuqeqcn993993ncjajc')
    } catch (error) {
        req.isAuth = false
        return next()
    }
    if(!decodeToken){

        req.isAuth = false
        return next()
    }

    req.isAuth = true
    req.user_id = decodeToken.userID
    req.token = decodeToken.token
    return next()
} 