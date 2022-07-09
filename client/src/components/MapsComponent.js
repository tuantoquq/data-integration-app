import {
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { useState, memo } from "react";
import { INIT_MAP_POSITION } from "../constants/Constants";
import PlaceCard from "./CardInformation";

const containerStyle = {
  width: "83vw",
  height: "100vh",
};

function MapsComponent({markers}) {
  
  const [activeMaker, setActiveMaker] = useState(null);

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

  const handleClick = (ev) => {
    console.log(ev.latLng.lat());
    console.log(ev.latLng.lng());
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={handleOnload}
      zoom={INIT_MAP_POSITION.zoom}
      onClick={handleClick}
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
