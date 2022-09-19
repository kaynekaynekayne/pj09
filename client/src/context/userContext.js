import {createContext, useContext, useEffect, useState} from 'react';
import {isUserLoggedIn} from '../api/user/user';
import Swal from 'sweetalert2';

export const userContext=createContext(null);

export const UserContextProvider=({children})=>{
    
    const localUser=localStorage.getItem("user");
    const [user,setUser]=useState(localUser);

    useEffect(()=>{
        const unsubscribe=isUserLoggedIn()
        .then(resp=>{
            setUser(resp.username)
        })
        .catch(err=> {
            localStorage.removeItem("user");
            setUser(null);
            Swal.fire({
                icon: 'warning',
                text: err.message,
                showConfirmButton:false,
                width:'20rem',
                position:'top',
            })
        });
        
        return ()=>unsubscribe;
        
    },[]);
    
    return(
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
};

export const useUserContext=()=>useContext(userContext);