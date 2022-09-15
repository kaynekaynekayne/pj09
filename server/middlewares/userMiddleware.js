import User from "../models/User.js";

export const userRegisterValidator=(req,res,next)=>{
    req.check("email","이메일은 필수입니다").notEmpty();
    req.check("email","올바른 이메일 형식이 아닙니다").isEmail();
    
    req.check("username","닉네임은 필수입니다").notEmpty();
    
    req.check("password","비밀번호는 필수입니다").notEmpty();
    req.check("password").isLength({min:8}).withMessage("비밀번호는 여덟자 이상이어야 합니다");
    req.check("password","비밀번호는 최소 하나의 소문자와 하나의 대문자를 포함해야 합니다")
    .matches(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,"i");

    const errors=req.validationErrors();
    if(errors){
        const firstError=errors.map(err=>err.msg)[0];
        return res.status(400).json({error:firstError})
    };
    next();
};

export const userById=async(req,res,next)=>{
    User.findById(req._id).exec((err,user)=>{
        if(err || !user){
            return res.status(404).json({
                error:"유저를 찾을 수 없습니다"
            })
        }
        req.user=user;
        next();
    });
}