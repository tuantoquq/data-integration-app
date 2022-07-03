import {
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { useState, memo, useEffect } from "react";
import { INIT_MAP_POSITION } from "../../constants/Constants";
import { markerData } from "../mock/SampleData";

const containerStyle = {
  width: "90vw",
  height: "80vh",
};

function MapsComponent() {
  
  const [activeMaker, setActiveMaker] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setMarkers(markerData);
  },[])

  const handleOnload = (map) => {
    const bounds = new window.google.maps.LatLngBounds(
      INIT_MAP_POSITION.center
    );
    markers.forEach(({position}) => bounds.extend(position));
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
    >
      {markers.map((item) => {
        return (
          <Marker
            key={item.id}
            position={item.position}
            onClick={() => handlerActiveMaker(item.id)}
          >
            {activeMaker === item.id ? (
              <InfoWindow onCloseClick={() => setActiveMaker(null)}>
                <div>{item.name}</div>
              </InfoWindow>
            ) : null}
          </Marker>
        );
      })}
    </GoogleMap>
  );
}

export default memo(MapsComponent);
