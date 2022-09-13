import React, {useEffect, useState} from 'react';
import {mainEvents} from '../api/kopis';
import reformatData from '../utils/reformatData';
import xmlConverter from '../utils/xmlConverter';
import {Grid, Container} from '@mui/material'
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
        <Container>
            <Grid container spacing={2} mb={5}> 
                {events.length===0 ? <h2>Loading...</h2> :
                    events.map((event)=>
                        <Grid item xs={12} sm={6} md={3} key={event.mt20id}>
                            <Card event={event}/>
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    );
};

export default Home;