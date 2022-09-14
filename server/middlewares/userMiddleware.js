export const userRegisterValidator=(req,res,next)=>{
    req.check("username","닉네임은 필수입니다.").notEmpty();
    
    req.check("email","이메일은 필수입니다.").notEmpty();
    req.check("email","올바른 이메일 형식이 아닙니다.").isEmail();

    req.check("password","비밀번호는 필수입니다.").notEmpty();
    req.check("password").isLength({min:8}).withMessage("비밀번호는 여덟자 이상이어야 합니다.");
    req.check("password","비밀번호는 최소 하나의 소문자와 하나의 대문자를 포함해야 합니다.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,"i");

    const errors=req.validationErrors();
    if(errors){
        const firstError=errors.map(err=>err.msg)[0];
        return res.status(400).json({error:firstError})
    };
    next();
}