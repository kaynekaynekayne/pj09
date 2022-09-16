import {createContext, useContext, useEffect, useState} from 'react';
import {isUserLoggedIn} from '../api/user';


export const userContext=createContext(null);

export const UserContextProvider=({children})=>{

    const [user,setUser]=useState(null);

    useEffect(()=>{
        const unsubscribe=isUserLoggedIn()
        .then(resp=>console.log(resp))
        .catch(err=>console.log("err",err));//swal
        
        return ()=>unsubscribe;
        
    },[]);
    
    return(
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
};

export const useUserContext=()=>useContext(userContext);