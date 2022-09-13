import axios from "axios";

const BASE_URL="/openApi/restful/";
const YEAR=new Date().getFullYear();
const DATE=new Date().toISOString().slice(5,10).replaceAll("-","");

export const mainEvents=async()=>{
    try{
        const response=await axios.get(`${BASE_URL}/pblprfr`,{
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
        console.log(err.message);
    }
};

export const search=async(query)=>{
    try{
        const response=await axios.get(`${BASE_URL}/pblprfr`,{
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
        console.log(err.message);
    }
}