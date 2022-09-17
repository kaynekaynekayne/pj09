import React from 'react'

const DetailEvent = ({details}) => {

    const {prfnm,genrem,poster,fcltynm}=details;
    return (
        <section>
            <img src={poster} style={{width:"300px"}}/>
            <h4>{prfnm}</h4>
            <h5>{fcltynm}</h5>
        </section>
    )
}

export default DetailEvent;
