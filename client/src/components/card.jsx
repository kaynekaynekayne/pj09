import React from 'react'
import { Link } from 'react-router-dom';
import {Card, CardMedia, CardContent, Typography} from '@mui/material'

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
                <Typography variant="body1">{prfnm}</Typography>
                {genre && 
                    <Typography variant="body2" color="text.secondary">
                        {genre}
                    </Typography>
                }
                {stdate && eddate && 
                    <Typography variant="body2" color={prfstate==="공연중" ? "text.primary" : "text.disabled"}>
                        {`${stdate}-${eddate} ${prfstate}`}
                    </Typography>
                }
            </CardContent>
            
        </Card>
    )
}

export default card