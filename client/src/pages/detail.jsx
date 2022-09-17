import React,{useState, useEffect} from 'react';
import DetailEvent from '../components/detailEvent';
import DetailMap from '../components/detailMap';
import {useParams} from 'react-router-dom';

import {eventDetail} from '../api/kopis';
import xmlConverter from '../utils/xmlConverter';
import reformatDetailData from '../utils/reformatDetailData';

const Detail = () => {
    const params=useParams();
    const {id}=params;

    const [details, setDetails]=useState({});
    console.log(details);

    const getDetails=async()=>{
        try{
            const response=await eventDetail(id);
            const data=await xmlConverter(response);
            const items=reformatDetailData(data);
            setDetails(items);
            return items.mt10id
        }catch(err){
            console.log(err.message);
        }
    };

    useEffect(()=>{
        getDetails().then(placeCode=>console.log(placeCode));
    },[id]);
    
    return (
        <section>
            <div>
                <DetailEvent />
                <DetailMap />
            </div>
        </section>
    )
}

export default Detail;