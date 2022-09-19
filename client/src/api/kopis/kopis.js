import instance from './index.js';

const YEAR=new Date().getFullYear();
const DATE=new Date().toISOString().slice(5,10).replaceAll("-","");

export const mainEvents=async()=>{
    try{
        const response=await instance.get('/pblprfr',{
            params:{
                service:process.env.REACT_APP_OPENDATA_KEY,
                stdate:YEAR-1+DATE,
                eddate:YEAR+1+DATE,
                cpage:1,
                rows:8,
                prfstate:'02',
                signgucode:	11
            }
        });
        return response.data;
    }catch(err){
        throw new Error(err.message);
    }
};

export const search=async(query)=>{
    try{
        const response=await instance.get('/pblprfr',{
            params:{
                service:process.env.REACT_APP_OPENDATA_KEY,
                stdate:YEAR-10+DATE,
                eddate:YEAR+2+DATE,
                cpage:1,
                rows:15,
                shprfnm:query,
            }
        })
        return response.data;
    }catch(err){
        throw new Error(err.message);
    }
};

export const eventDetail=async(id)=>{
    try{
        const response=await instance.get(`/pblprfr/${id}`,{
            params:{
                service:process.env.REACT_APP_OPENDATA_KEY,
            }
        });
        return response.data;
    }catch(err){
        throw new Error(err.message); //throw로 고치자 전부
    }
};

export const placeDetail=async(code)=>{
    try{
        const response=await instance.get(`/prfplc/${code}`,{
            params:{
                service:process.env.REACT_APP_OPENDATA_KEY,
            }
        })
        return response.data;
    }catch(err){
        throw new Error(err.message);
    }
}