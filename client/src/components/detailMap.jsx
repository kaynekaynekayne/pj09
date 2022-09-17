import React,{useState} from 'react';
import {
    GoogleMap, 
    useJsApiLoader, 
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api';
import ImportExportIcon from '@mui/icons-material/ImportExport';

const containerStyle = {
    width: '100%',
    height: '100vh'
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
        setDistance(origin);
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
                    <input 
                        placeholder="출발지"
                        type="text"
                        onChange={(e)=>setOrigin(e.target.value)}
                        value={origin}
                    />
                </Autocomplete>
                <Autocomplete>
                    <input 
                        placeholder="목적지"
                        type="text"
                        onChange={(e)=>setDestination(e.target.value)}
                        value={destination}
                    />
                </Autocomplete>
                <button onClick={onToggleClick}>
                    <ImportExportIcon />
                </button>
                <button onClick={getRoute} type="submit">Go</button>
                <button onClick={clearRoute}></button>
                <div>
                    <p>거리 {distance}</p>
                    <p>이동시간 {duration}</p>
                </div>
                <button onClick={()=>map.panTo({lat,lng})}>돌아가기</button>
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
}

export default DetailMap;
