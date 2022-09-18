import React,{useState} from 'react'
import {Typography, Grid, Container, Card, 
    CardHeader, CardMedia,CardContent, CardActions,
Collapse,
IconButton, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import trimFullYear from '../utils/trimFullYear';
import styled from 'styled-components';


const DetailEvent = ({details}) => {

    const [expanded, setExpanded]=useState(false);
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

    const handleExpand=()=>setExpanded(prev=>!prev);
    
    return (
        <section>
            {Object.keys(details).length===0 ? <h3>Loading...</h3> :
            <Card>
                <CardHeader 
                    title={prfnm}
                    subheader={fcltynm}
                />
                <CardMedia 
                    component="img"
                    height="400px"
                    objectFit="cover"
                    image={poster}
                    alt="poster"
                />
                <CardActions>
                    <IconButton aria-label="more information" onClick={handleExpand}>
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>공연 기간</Typography>
                    </CardContent>
                </Collapse>
                    {/* <h6>{genrenm}</h6> */}
                {/* <Grid container mt={2}>
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
                </Grid> */}

            </Card>
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
