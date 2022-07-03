import {
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { useState, memo, useEffect } from "react";
import { INIT_MAP_POSITION } from "../../constants/Constants";
import { getAllPlace } from "../../service/PlaceService";
import PlaceCard from "./CardInformation";

const containerStyle = {
  width: "74.5vw",
  height: "85vh",
};

function MapsComponent() {
  
  const [activeMaker, setActiveMaker] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    getAllPlace().then(res => {
      setMarkers(res?.data?.data);
      console.log(res?.data?.data);
    })
  },[])

  const handleOnload = (map) => {
    const bounds = new window.google.maps.LatLngBounds(
      INIT_MAP_POSITION.center
    );
    markers.forEach((item) => bounds.extend({lat: item.latitude, lng: item.longitude}));
    map.fitBounds(bounds);
  };


  const handlerActiveMaker = (maker) => {
    if (maker === activeMaker) {
      return;
    }
    setActiveMaker(maker);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={handleOnload}
      zoom={INIT_MAP_POSITION.zoom}
    >
      {markers.map((item) => {
        return (
          <Marker
            key={item.id}
            position={{lat: item.latitude, lng: item.longitude}}
            onClick={() => handlerActiveMaker(item.id)}
          >
            {activeMaker === item.id ? (
              <InfoWindow onCloseClick={() => setActiveMaker(null)}>
                <PlaceCard name={item.name} address={item.address} place_type={item.place_type}/>
              </InfoWindow>
            ) : null}
          </Marker>
        );
      })}
    </GoogleMap>
  );
}

export default memo(MapsComponent);
