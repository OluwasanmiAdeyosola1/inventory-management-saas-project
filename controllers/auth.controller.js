const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Store = require("../models/Store");

const signToken = (user) =>
    jwt.sign(
        { userId : user._id, storeId : user.storeId, role : user.role},
        process.env.JWT_SECRET,
        {expiresIn : "7d"}
    );

    // First time login and register store owner 
exports.registerOwner = async (req,res) => {
    try{
        const { businessName , email , phone ,address , city , state , country, name , password} = req.body;
        const existing = await User.findOne({email});
        if (existing) {
            return res.status(400).json({success: false , message:"Email has already been used , please try another" , data : null});
        }
        const store = await Store.create({businessName , email , phone , address });
        const storePassword = await bcrypt.hash(password , 10 );
        const user = await User.create({
            storeId: store._id,
            name ,
            email,
            password : storePassword,
            role: "owner",
        });
        const token = signToken(user);
        res.status(201).json({
            success : true,
            message : "Your store and owner account has been successfully created !",
            data: { token , user: {id :user._id,name : user.name ,email:user.email ,role : user.role}, store},
        });
    } catch (error) {
    
        res.status(500).json({success : false , message :"Sorry , you are unable to create an account ." , data:null});
    }
};

// add staff to store 
exports.registerStaff = async (req,res) => {
    try {
        const {name , email , password , role} = req.body ;
        const storeId = req.user.storeId;
        const existing = await User.findOne({email});
        if (existing) {
            return res.status(400).json({success : false , message : "Email inputed is already in use .", data : null});
        }
        const storePassword = await bcrypt.hash(password , 10);
        const user = await User.create({
            storeId,
            name,
            email,
            password : storePassword ,
            role : role || "staff",
        });
        res.status(201).json({
            success : true,
            message : "Your staff account has been successfully craeted !",
            data: {id : user._id, name :user.name , email: user.email,role:user.role},
        });
    } catch (error) {
        
        res.status(500).json({success:false , message: " Sorry you are unable to create an account." , data : null});
    }
};
exports.login = async (req,res) => {
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email}).select("+password");
        if (!user || !user.isActive) {
            return res.status(401).json({success: false , message : "Invalid email or password inputed ." , data : null});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(401).json({success:false, message :"Invalid email or password inputed .", data: null});
        }
        const token = signToken(user);
        res.status(200).json({
            success : true,
            message: "Login successful",
            data:{token, user:{id:user._id , name:user.name , email : user.email , role : user.role , storeId : user.storeId}},
        });
    }catch (error) {
        res.status(500).json({success: false, message: "Sorry , something went wrong somwhere.", dat: null});
    }
};
exports.getMe = async (req,res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({success: false , message :"User not found", data:null});
        }
        res.status(200).json({success : true , message: "Congratulations , User fetched successfully !", data : user});
    }catch (error) {
        
        res.status(500).json({success:false , message: "Something went wrong" , data : null});
    }
};
