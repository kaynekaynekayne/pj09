import axios from 'axios';

export const signup=async({username, email, password, confirmPassword}={})=>{
    const user={username, email, password, confirmPassword};
    
    try{
        // const response=await axios.post(`${process.env.REACT_APP_LOCAL_URL}/register`,
        //     JSON.stringify(user),{
        //         headers:{
        //             Accept:'application/json',
        //             "Content-Type":"application/json",
        //         }
        //     }
        // );
        // console.log(response);
        // return await response.json();

        const res=await fetch(`${process.env.REACT_APP_LOCAL_URL}/register`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        });

        return await res.json();
    }catch(err){
        throw new Error(`가입을 할 수 없습니다. ${err}`)
    }
};

export const login=async({email, password}={})=>{
    const user={email, password};
    try{
        const response=await axios.post(`${process.env.REACT_APP_LOCAL_URL}/login`,
            JSON.stringify(user),{
                withCredentials:true,
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                }
            },
        )
        return await response.json();
    }catch(err){
        throw new Error(`로그인을 할 수 없습니다. ${err}`)
    }
};

export const logout=async()=>{
    try{
        const response=await axios.get(`${process.env.REACT_APP_LOCAL_URL}/logout`,{
            withCredentials:true
        })
        return await response.json();
    }catch(err){
        console.log(err);
    }
};

export const isUserLoggedIn=async()=>{
    try{
        const response=await axios.get(`${process.env.REACT_APP_LOCAL_URL}/user`,{
            withCredentials:true
        })
        return await response.json();
    }catch(err){
        throw new Error("로그인을 해주십시오.");
    }
};
