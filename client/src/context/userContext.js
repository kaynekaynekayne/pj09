import {createContext, useContext, useEffect, useState} from 'react';
import {isUserLoggedIn} from '../api/user';


export const userContext=createContext(null);

export const UserContextProvider=({children})=>{
    
    const [user,setUser]=useState(null);
    console.log("userContext user: ",user);//맨처음에 null로 뜨는게 치명적, 로그인이 되어있어도 뒤늦게 바뀜
    
    useEffect(()=>{
        const unsubscribe=isUserLoggedIn()
        .then(resp=>{
            console.log(resp.username)
            setUser(resp.username)
        })
        .catch(err=>console.log("userContet err",err));//swal
        
        return ()=>unsubscribe;
        
    },[]);
    
    return(
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
};

export const useUserContext=()=>useContext(userContext);