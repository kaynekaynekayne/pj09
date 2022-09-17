import React from 'react'

const DetailMap = ({location}) => {
    console.log(location);
    return (
        <div>{location.address}</div>
    )
}

export default DetailMap;
