import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { search } from '../api/kopis/kopis';
import reformatData from '../utils/reformatData';
import xmlConverter from '../utils/xmlConverter';
import {Grid, Container} from '@mui/material'
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Card from '../components/card';
import Loading from '../components/loading';

const Searched = () => {
    const [searchedEvents, setSearchedEvents]=useState([]);
    const [noResult, setNoResult]=useState(false);
    const [loading, setLoading]=useState(false);

    const params=useParams();
    const {word}=params;

    const getSearchingLists=async()=>{
        try{
            setLoading(true);
            const response=await search(word);
            const data=await xmlConverter(response);
            if(data.length===0) {
                setNoResult(true);
                setLoading(false);
            }else{
                const items=reformatData(data);
                setSearchedEvents(items);
                setNoResult(false);
                setLoading(false);
            };
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        getSearchingLists();
    },[word]);

    return (
        <Container>
            {loading ? <Loading />:(
                noResult ? <div><SearchOffIcon color="disabled" fontSize="large"/><p>검색 결과가 없습니다</p></div> :
                <Grid container spacing={4} mb={5}> 
                    {searchedEvents.map((event)=>
                        <Grid item xs={12} sm={6} md={3} key={event.mt20id}>
                            <Card event={event} stdate={event.prfpdto} eddate={event.prfpdto}/>
                        </Grid>
                    )}
                </Grid>
                )
            }
        </Container>
    )
}

export default Searched;