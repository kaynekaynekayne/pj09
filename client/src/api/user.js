import axios from 'axios';

export const signup=async({username, email, password, confirmPassword}={})=>{
    const user={username, email, password, confirmPassword};
    try{
        const response=await axios.post(`${process.env.REACT_APP_LOCAL_URL}/register`,
            user,
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
    const user={email, password};
    try{
        const response=await axios.post(`${process.env.REACT_APP_LOCAL_URL}/login`,
            user,
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
        const response=await axios.get(`${process.env.REACT_APP_LOCAL_URL}/logout`,
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
    // const response=await axios.get(`${process.env.REACT_APP_LOCAL_URL}/user`,
    //     {
    //         withCredentials:true,
    //     }
    // )
    // console.log(response.data)
    // return await response.data;

    try{
        const response=await axios.get(`${process.env.REACT_APP_LOCAL_URL}/user`,
            {
                withCredentials:true,
            }
        )
        return await response.data;
    }catch(err){
        throw new Error("로그인을 해주십시오.");
    }
};
