import React,{useState} from 'react';
import {
    GoogleMap, 
    useJsApiLoader, 
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api';
import {IconButton, TextField} from '@mui/material'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ClearIcon from '@mui/icons-material/Clear';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import RedoIcon from '@mui/icons-material/Redo';
import styled from 'styled-components';

const containerStyle = {
    width: '100%',
    height: '80vh'
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
    }

    return isLoaded ? (
        <section>
            <div>
                <Autocomplete>
                    {/* <TextField 
                        placeholder="출발지"
                        onChange={(e)=>setOrigin(e.target.value)}
                        value={origin}
                        hiddenLabel
                    /> */}
                    <Input 
                        placeholder="출발지"
                        type="text"
                        onChange={(e)=>setOrigin(e.target.value)}
                        value={origin}
                    />
                </Autocomplete>
                <Autocomplete>
                    {/* <TextField 
                        hiddenLabel
                        value={destination}
                        onChange={(e)=>setDestination(e.target.value)}
                        placeholder="목적지"

                    /> */}
                    <Input
                        placeholder="목적지"
                        type="text"
                        onChange={(e)=>setDestination(e.target.value)}
                        value={destination}
                    />
                </Autocomplete>
                <IconButton aria-label="reverse" onClick={onToggleClick}>
                    <ImportExportIcon/>
                </IconButton>
                <IconButton aria-label="go" onClick={getRoute} color="primary">
                    <DirectionsTransitIcon />
                </IconButton>
                <IconButton aria-label="clear" onClick={clearRoute}>
                    <ClearIcon />
                </IconButton>
                <div>
                {distance && duration && <>
                    <span>거리 {distance} </span>
                    <span>이동 {duration}</span>
                </>
                }
                </div>
                <IconButton aria-label="center" onClick={()=>map.panTo({lat,lng})}>
                    <RedoIcon />
                </IconButton>
            </div>
            <GoogleMap
                zoom={18}
                center={{lat,lng}}
                mapContainerStyle={containerStyle}
                options={{
                    mapTypeControl:false,
                    streetViewControl:false,
                    gestureHandling:'greedy'
                }}
                onLoad={(map)=>setMap(map)}
                
            >
                <Marker position={{lat,lng}}/>
                {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
            </GoogleMap>
        </section>
    ):<h3>Loading... </h3>
};

const Input=styled.input`
    width:100%;
    padding:0.5rem;
    outline:0;
    margin-bottom:0.3rem;
`;
export default DetailMap;
