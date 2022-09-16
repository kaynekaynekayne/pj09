import {Navigate} from 'react-router-dom';
import { useUserContext } from './context/userContext';

export const ProtectedRoute=({children})=>{
    const {user}=useUserContext();
    console.log(user);

    if(!user){
        return <Navigate to="/login" />;
    }

    return children;
}

