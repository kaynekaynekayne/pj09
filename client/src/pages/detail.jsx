import React,{useState, useEffect} from 'react';
import DetailEvent from '../components/detailEvent';
import DetailMap from '../components/detailMap';
import {useParams} from 'react-router-dom';

import {eventDetail, placeDetail} from '../api/kopis';
import xmlConverter from '../utils/xmlConverter';
import reformatDetailData from '../utils/reformatDetailData';
import {Grid, Container} from '@mui/material'

const Detail = () => {
    const params=useParams();
    const {id}=params;

    const [details, setDetails]=useState({});
    const [location, setLocation]=useState({lat:null, lng:null, address:null});
    console.log("details: ",details)
    console.log("location: ",location)

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

    const getPlaces=async(code)=>{
        try{
            const response=await placeDetail(code);
            const data=await xmlConverter(response);
            const items=reformatDetailData(data);
            setLocation({
                lat:parseFloat(items.la), 
                lng:parseFloat(items.lo), 
                address:items.adres
            });
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        getDetails()
        .then(placeCode=>getPlaces(placeCode));
    },[id]);
    
    return (
        <Container>
            <Grid container mb={5}>
                <Grid item xs={6}>
                    <DetailEvent details={details}/>
                </Grid>
                <Grid item xs={6}>
                    <DetailMap />
                </Grid>
                {/* <Grid item xs={1}>
                </Grid>
                <Grid item xs={1}>
                </Grid> */}
            </Grid>
        </Container>
    )
}

export default Detail;