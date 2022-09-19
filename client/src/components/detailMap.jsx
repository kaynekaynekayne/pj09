import React,{useState} from 'react';
import {
    GoogleMap, 
    useJsApiLoader, 
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api';
import {IconButton} from '@mui/material'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ClearIcon from '@mui/icons-material/Clear';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import ReplayTwoToneIcon from '@mui/icons-material/ReplayTwoTone';
import styled from 'styled-components';
import Loading from './loading';

const containerStyle = {
    width: '100%',
    height: '27.5rem'
};

const DetailMap = ({location}) => {
    const {lat, lng, address}=location;
    const [libraries]=useState(['places']);

    const {isLoaded}=useJsApiLoader({
        id:"google-map-script",
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAP_KEY,
        libraries,
    });

    const [map,setMap]=useState(/** @type google.maps.Map */(null));
    const [origin, setOrigin]=useState("");
    const [destination, setDestination]=useState(address || "");
    
    const [directionsResponse, setDirectionsResponse]=useState(null);
    const [distance, setDistance]=useState("");
    const [duration, setDuration]=useState("");

    const onToggleClick=()=>{
        setOrigin(destination);
        setDestination(origin);
    };

    const getRoute=async()=>{
        if(origin==="" || destination===""){
            return;
        };

        try{
            const directionService=new window.google.maps.DirectionsService();
            const results=await directionService.route({
                origin,
                destination,
                travelMode:window.google.maps.TravelMode.TRANSIT,
            })
            setDirectionsResponse(results);
            setDistance(results.routes[0].legs[0].distance.text);
            setDuration(results.routes[0].legs[0].duration.text);
        }catch(err){
            console.log(err.message);
        }
    };

    const clearRoute=()=>{
        setDirectionsResponse(null);
        setDistance("");
        setDuration("");
        setOrigin("");
        setDestination("");
    };

    return (
        <section>
            {isLoaded ? (
            <>
                <div>
                    <Autocomplete>
                        <Input 
                            placeholder="출발지"
                            type="text"
                            onChange={(e)=>setOrigin(e.target.value)}
                            value={origin}
                        />
                    </Autocomplete>
                    <Autocomplete>
                        <Input
                            placeholder="목적지"
                            type="text"
                            onChange={(e)=>setDestination(e.target.value)}
                            value={destination}
                        />
                    </Autocomplete>
                    <MapIconBox>
                        <div>
                            <IconButton aria-label="reverse" onClick={onToggleClick}>
                                <ImportExportIcon/>
                            </IconButton>
                            <IconButton aria-label="go" onClick={getRoute} color="primary">
                                <DirectionsTransitIcon />
                            </IconButton>
                            <IconButton aria-label="clear" onClick={clearRoute}>
                                <ClearIcon />
                            </IconButton>
                        </div>
                        <IconButton aria-label="center" onClick={()=>map.panTo({lat,lng})}>
                            <ReplayTwoToneIcon />
                        </IconButton>
                    </MapIconBox>
                    <div style={{padding:'0.4rem'}}>
                        {distance && duration && <>
                            <span>(거리) <strong>{distance} </strong></span>
                            <span>(시간) <strong>{duration}</strong></span>
                        </>
                        }
                    </div>
                </div>
                <GoogleMap
                    zoom={18}
                    center={{lat,lng}}
                    mapContainerStyle={containerStyle}
                    options={{
                        mapTypeControl:false,
                        streetViewControl:false,
                        gestureHandling:'greedy',
                    }}
                    onLoad={(map)=>setMap(map)}    
                >
                    <Marker position={{lat,lng}}/>
                    {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
                </GoogleMap>
            </>
            ):<Loading />
            }
        </section>
    )
};

const Input=styled.input`
    width:100%;
    padding:0.5rem;
    outline:0;
    margin-bottom:0.5rem;
`;

const MapIconBox=styled.div`
    display:flex;
    justify-content:space-between;
`;
export default DetailMap;
