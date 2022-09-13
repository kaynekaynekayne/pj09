import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { search } from '../api/kopis';
import reformatData from '../utils/reformatData';
import xmlConverter from '../utils/xmlConverter';
import {Grid, Container} from '@mui/material'
import Card from '../components/card';

const Searched = () => {
    const [searchedEvents, setSearchedEvents]=useState([]);

    const params=useParams();
    let {word}=params;

    const getSearchingLists=async()=>{
        try{
            const response=await search(word);
            const data=await xmlConverter(response);
            const items=reformatData(data);
            setSearchedEvents(items);
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        getSearchingLists();
    },[word]);

    return (
        <Container>
            {/* {searchedEvents.length===0 ? <h2>Loading...</h2> : } */}
                <Grid container spacing={4} mb={5}> 
                    {searchedEvents.map((event)=>
                        <Grid item xs={12} sm={6} md={3} key={event.mt20id}>
                            <Card event={event} stdate={event.prfpdto} eddate={event.prfpdto}/>
                        </Grid>
                    )}
                </Grid>
        </Container>
    )
}

export default Searched;