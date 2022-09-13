import React, {useEffect, useState} from 'react';
import {mainEvents} from '../api/kopis';
import reformatData from '../utils/reformatData';
import xmlConverter from '../utils/xmlConverter';
import Card from '../components/card';

const Home = () => {

    const [events, setEvents]=useState([]);

    useEffect(()=>{
        getEvents();
    },[]);

    const getEvents=async()=>{
        try{
            const response=await mainEvents();
            const data=await xmlConverter(response);
            const items=reformatData(data);
            setEvents(items);
        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <div> 
            {events.length===0 ? <h2>Loading...</h2> :
                events.map((event)=>
                    <Card key={event.mt20id} event={event}/>
                )
            }
        </div>
    );
};

export default Home;