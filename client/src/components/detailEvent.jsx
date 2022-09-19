import React,{useState} from 'react'
import {
    Typography, 
    Card, 
    CardHeader, 
    CardMedia,
    CardContent, 
    CardActions,
    Collapse,
    IconButton, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import trimFullYear from '../utils/trimFullYear';
import styled from 'styled-components';
import Loading from './loading';


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
        prfstate,
        prfage,
    }=details;

    const handleExpand=()=>setExpanded(prev=>!prev);
    const titleTypo=(field)=>{
        return <Typography variant="subtitle2"><strong>{field}</strong></Typography>
    };

    return (
        <section>
            {Object.keys(details).length===0 ? <Loading /> :
            <Card>
                <CardHeader 
                    title={prfnm}
                    subheader={fcltynm}
                />
                <CardMedia 
                    component="img"
                    src={poster}
                    alt="poster"
                    sx={{ maxHeight: '28rem', objectFit:'contain',}}
                />
                <CardActions >
                    <IconButton aria-label="more information" onClick={handleExpand}>
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <TextContainer>
                            {titleTypo("장르")}
                            <Typography variant="subtitle2">{genrenm}</Typography>
                        </TextContainer>
                        <TextContainer>
                            {titleTypo("공연기간")}
                            <Typography variant="subtitle2" color={prfstate==="공연완료" ? "text.disabled" : "text.primary"}>
                                {trimFullYear(prfpdfrom)}-{trimFullYear(prfpdto)} ({prfstate})
                            </Typography>
                        </TextContainer>
                        <TextContainer>
                            {titleTypo("공연시간")}
                            <Typography variant="subtitle2">{prfruntime}</Typography>
                        </TextContainer>
                        <TextContainer>
                            {titleTypo("등급")}
                            <Typography variant="subtitle2">{prfage}</Typography>
                        </TextContainer>
                        <TextContainer>
                            {titleTypo("배우")}
                            <Typography variant="subtitle2">{prfcast}</Typography>
                        </TextContainer>
                        <TextContainer>
                            {titleTypo("가격")}
                            <Typography variant="subtitle2">{pcseguidance}</Typography>
                        </TextContainer>
                    </CardContent>
                </Collapse>
            </Card>
            }
        </section>
    )
}

const TextContainer=styled.div`
    margin-bottom:1rem;
    display:flex;
    justify-content:space-between;
`;

export default DetailEvent;
