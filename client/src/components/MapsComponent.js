import {
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { useState, memo } from "react";
import { INIT_MAP_POSITION } from "../constants/Constants";
import PlaceCard from "./CardInformation";
import { connect, useDispatch, useSelector } from "react-redux";
import { GET_LOCATE } from "../store/actions/Actions";
import { getDetailPlace } from "../service/PlaceService";

const containerStyle = {
  width: "83vw",
  height: "100vh",
};

function MapsComponent({markers}) {
  const dispatch = useDispatch(); 
  const [activeMaker, setActiveMaker] = useState(null);
  const currentPickLocation = useSelector(state => state.pickLocate);
  const [detailPlace, setDetailPlace] = useState();

  console.log("crr: ", currentPickLocation);

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
    getDetailPlace(maker).then(res => {
      setDetailPlace(res?.data?.data);
      setActiveMaker(maker);
    })
  };

  const handleClick = (ev) => {
    console.log(ev.latLng.lat());
    console.log(ev.latLng.lng());
    const position = {longitude: ev.latLng.lng(), latitude: ev.latLng.lat()}
    dispatch({type: GET_LOCATE, payload: position});
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={handleOnload}
      zoom={INIT_MAP_POSITION.zoom}
      onRightClick={handleClick}
    >
      {markers.map((item) => {
        return (
          <Marker
            key={item.id}
            position={{lat: item.latitude, lng: item.longitude}}
            onClick={() => handlerActiveMaker(item.id)}
          >
            {activeMaker === item.id ? (
              <InfoWindow onCloseClick={() => setActiveMaker("")}>
                <PlaceCard place={detailPlace}/>
              </InfoWindow>
            ) : null}
          </Marker>
        );
      })}
    </GoogleMap>
  );
}

export default connect(null, null)(memo(MapsComponent));
