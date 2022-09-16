import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register=async(req,res)=>{
    const {username, email, password, confirmPassword}=req.body;

    const usernameExists=await User.findOne({username});
    const emailExists=await User.findOne({email});

    if(emailExists){
        return res.status(400).json({
            error:"이미 사용중인 이메일입니다."
        })
    }

    if(usernameExists){
        return res.status(400).json({
            error:"이미 사용중인 닉네임입니다"
        })
    }
    if(password!==confirmPassword){
        console.log(password, confirmPassword)
        return res.status(400).json({
            error:"비밀번호가 일치하지 않습니다"
        })
    }

    await User.create({
        username,
        email,
        password,
    })

    res.status(201).json({
        message:"성공적인 회원가입"
    })
};

export const login=async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            error:"이메일이 존재하지 않습니다"
        })
    }

    const match=await bcrypt.compare(password, user.password);
    if(!match){
        return res.status(400).json({error:"비밀번호가 일치하지 않습니다"});
    };

    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    console.log("token: ",token);

    res.cookie("jwt", token, {httpOnly:true, maxAge:1000 * 60 * 60 * 24 * 3 });

    const {username}=user;
    return res.status(201).json({
        message:"성공적인 로그인",
        username
    });
};

export const logout=(req,res)=>{
    res.clearCookie("jwt");
    return res.json({message:"성공적인 로그아웃"});
};

export const isUserLoggedIn=(req,res)=>{
    const {username}=req.user;
    return res.status(200).json({
        message:"유저가 로그인 되어 있습니다",
        username,
    })
};