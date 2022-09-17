import React from 'react'
import {Typography} from '@mui/material'
import trimFullYear from '../utils/trimFullYear';

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
        <section>
            {Object.keys(details).length===0 ? <h3>Loading...</h3> :
            <>
                <img src={poster} style={{width:"300px"}}/>
                <Typography variant="h6">{prfnm}</Typography>
                <Typography variant="subtitle1">{fcltynm}</Typography>
                <Typography variant="body2" mb={2}>{genrenm}</Typography>
                <div>
                    <Typography variant="subtitle2" color={prfstate==="공연완료" ? "text.disabled" : "text.primary"}>
                        {trimFullYear(prfpdfrom)}-{trimFullYear(prfpdto)} ({prfstate})
                    </Typography>
                    <Typography variant="subtitle2">{prfcast}</Typography>
                    <Typography variant="subtitle2">러닝타임 {prfruntime}</Typography>
                    <Typography variant="subtitle2">{pcseguidance}</Typography>
                </div>
            </>
            }

        </section>
    )
}

export default DetailEvent;
