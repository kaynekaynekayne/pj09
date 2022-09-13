import React from 'react'
import { Link } from 'react-router-dom';
import {Card, CardMedia, CardContent, Typography} from '@mui/material'
import styled from 'styled-components';

const card = ({event, stdate, eddate, genre}) => {
    const {prfnm,poster,mt20id, prfstate}=event;

    return (
        <Card>
            {poster &&
                <Link to={`/info/${mt20id}`}>
                    <CardMedia
                        component="img" 
                        image={poster}
                        alt="poster" 
                        sx={{height:350}}
                    />
                </Link>
            }
            <CardContent sx={{height:85}}>
                <Typography variant="subtitle1">
                    <TextContainerStyle>{prfnm}</TextContainerStyle>
                </Typography>
                {genre && 
                    <Typography variant="subtitle2" color="text.secondary">
                        {genre}
                    </Typography>
                }
                {stdate && eddate && 
                    <Typography variant="subtitle2" color={prfstate==="공연완료" ? "text.disabled" : "text.primary"}>
                        {`${stdate} - ${eddate} ${prfstate}`}
                    </Typography>
                }
            </CardContent>
        </Card>
    )
}

const TextContainerStyle=styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export default card;