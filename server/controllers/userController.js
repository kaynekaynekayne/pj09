import User from "../models/User.js";

export const register=async(req,res)=>{
    const {username, email, password}=req.body;
    
    const usernameExists=await User.findOne({username});
    const emailExists=await User.findOne({email});

    if(usernameExists){
        return res.status(403).json({
            error:"닉네임이 이미 사용중입니다."
        })
    }
    if(emailExists){
        return res.status(403).json({
            error:"이메일이 이미 사용중입니다."
        })
    }

    await User.create({
        username,
        email,
        password,
    })

    res.status(201).json({
        message:"성공적인 회원가입!"
    })
}