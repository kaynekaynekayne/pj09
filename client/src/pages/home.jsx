import React, {useEffect, useState} from 'react';
import {mainEvents} from '../api/kopis';

const Home = () => {

    const [events, setEvents]=useState([]);

    useEffect(()=>{
        getEvents();
    },[]);

    const getEvents=async()=>{
        try{
            const a=await mainEvents();
            console.log(a);
        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <div> 
            {/* {events.length===0 ? <h2>Loading...</h2> :
                events.map((event)=>
                    <Card key={event.mt20id} event={event}/>
                )
            } */}
            home
        </div>
    );
};

export default Home;