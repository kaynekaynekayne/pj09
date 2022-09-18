import React from 'react'
import {Typography, Grid, Container} from '@mui/material'
import trimFullYear from '../utils/trimFullYear';
import styled from 'styled-components';


const DetailEvent = ({details}) => {

    const {
        prfnm,
        genrenm,
        poster,
        fcltynm,
        prfpdfrom,
        prfpdto,
        prfruntime,
        prfcast,
        pcseguidance,
        prfstate
    }=details;
    return (
        <section style={{width:'100%',height:"100%",backgroundColor:'tomato'}}>
            {Object.keys(details).length===0 ? <h3>Loading...</h3> :
            <>
                <div>
                    <h5>{prfnm}</h5>
                    <img src={poster} style={{width:'100%', height:"50%"}}/>
                    <h6>{fcltynm}</h6>
                    <span>{genrenm}</span>
                </div>
                <Grid container mt={2}>
                    <Grid item xs={4} sm={4} md={4}>
                        <Typography variant="subtitle2">공연기간</Typography>
                        <Typography variant="subtitle2">캐스팅</Typography>
                        <Typography variant="subtitle2">시간</Typography>
                        <Typography variant="subtitle2">가격</Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                        <Typography variant="subtitle2" color={prfstate==="공연완료" ? "text.disabled" : "text.primary"}>
                            {trimFullYear(prfpdfrom)}-{trimFullYear(prfpdto)} ({prfstate})
                        </Typography>
                        <Typography variant="subtitle2">{prfcast}</Typography>
                        <Typography variant="subtitle2">{prfruntime}</Typography>
                        <Typography variant="subtitle2">{pcseguidance}</Typography>
                    </Grid>
                </Grid>

            </>
            }
        </section>
    )
}

const Meta=styled.div`
    padding:1rem 3rem;
`;

const Guide=styled.span`
    font-weight: 600;
`

const TextContainer=styled.div`
    display:flex;
    justify-content:space-between;
`;

export default DetailEvent;
