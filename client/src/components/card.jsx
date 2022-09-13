import React from 'react'
import { Link } from 'react-router-dom';
import {Card, CardMedia, CardContent, Typography} from '@mui/material'

const card = ({event}) => {
    const {prfnm,prfpdfrom,prfpdto,fcltynm,poster,mt20id,prfstate}=event;

    return (
        <Card>
            {poster &&
                <Link to={`/info/${mt20id}`}>
                    <CardMedia
                        component="img" 
                        image={poster}
                        alt="poster" 
                        sx={{height:400}}
                    />
                </Link>
            }
            <CardContent sx={{height:80}}>
                <Typography variant="p">
                    {prfnm}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {prfpdfrom}~{prfpdto}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default card