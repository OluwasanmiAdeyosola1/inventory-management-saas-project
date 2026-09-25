const jwt = require("jsonwebtoken");
const authenticate = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({success : false , message :"Unauthorized request",data:null});
    }
    const token =authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch (error){
        return res.status(401).json({success:false , message:"This is an invalid or expired token." , data:null});
    }
};
module.exports= authenticate ;