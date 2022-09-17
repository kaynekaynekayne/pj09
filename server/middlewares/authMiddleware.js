import jwt from 'jsonwebtoken';

export const verifyToken=(req,res,next)=>{
    let token=req.cookies.jwt;
    if(!token){
        res.status(403).json({
            error:"액세스 토큰이 없습니다"
        })
    }

    let payload;
    try{
        payload=jwt.verify(token, process.env.TOKEN_SECRET);
        req._id=payload._id;
        next();
    }catch(err){
        res.status(403).json({error:"권한이 없습니다"})
    }
}