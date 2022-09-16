import jwt from 'jsonwebtoken';

export const verifyToken=(req,res,next)=>{
    let token=req.cookies.jwt;
    if(!token){
        res.status(403).json({
            error:"액세스 토큰이 없습니다"
        })
        //밑에 error랑 둘 다 /login으로 유도하는 방향으로 가야 함
        //"/"로 가도 "/login"으로 유도
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