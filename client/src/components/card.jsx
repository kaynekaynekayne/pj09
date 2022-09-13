import React from 'react'
import { Link } from 'react-router-dom';

const card = ({event}) => {
    const {prfnm,prfpdfrom,prfpdto,fcltynm,poster,mt20id,prfstate}=event;

    return (
        <div>
            <h3>{prfnm}</h3>
            {poster &&
                <Link to={`/info/${mt20id}`}>
                    <img src={poster} alt="poster" style={{width:'100px'}}/>
                </Link>
            }
            <h4>{prfpdfrom}~{prfpdto}</h4>
            <h5>{prfstate}</h5>
            {/* <h5>{fcltynm}</h5> */}
        </div>
    )
}

export default card