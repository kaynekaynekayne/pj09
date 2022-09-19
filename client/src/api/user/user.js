import instance from './index.js';

export const signup=async({username, email, password, confirmPassword}={})=>{
    const userInfo={username, email, password, confirmPassword};
    try{
        const response=await instance.post('/register',
            userInfo,
            {
                headers:{
                    Accept:'application/json',
                    "Content-Type":"application/json",
                }
            }
        ) 
        return await response.data;

    }catch(err){
        throw new Error(err.response.data.error)
    }
};

export const login=async({email, password}={})=>{
    const userInfo={email, password};
    try{
        const response=await instance.post('/login',
            userInfo,
            {
                withCredentials:true,
                headers:{
                    Accept:'application/json',
                    "Content-Type":"application/json",
                }
            }
        )
        return await response.data;
    }catch(err){
        throw new Error(err.response.data.error)
    }
};

export const logout=async()=>{
    try{
        const response=await instance.get('/logout',
            {
                withCredentials:true,
            }
        )
        return await response.data;
    }catch(err){
        console.log(err.response.data.error);
    }
};

export const isUserLoggedIn=async()=>{
    try{
        const response=await instance.get('/user',
            {
                withCredentials:true,
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("user")
                }
            },
        )
        return await response.data;
    }catch(err){
        throw new Error("로그인을 하십시오");
    }
};
