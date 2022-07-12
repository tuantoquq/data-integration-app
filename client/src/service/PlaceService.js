import api from "../service/ApiConfig.js";
export const getAllPlace = async () => {
  let response;
  try {
    response = await api.get("/places/all");
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const getPlaceById = async (placeId) => {
  let response;
  try {
    response = await api.get(`/places?placeId=${placeId}`);
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const getListPlaceType = async () => {
  let response;
  try {
    response = await api.get("/places/list-type");
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const getAllPlaceByFilter = async (
  placeType,
  radius,
  currentPosition
) => {
  let response;
  try {
    let url;
    if(placeType === "All Type" || placeType === ""){
        placeType = "All";
    }
    if(radius === -1 || radius === 0){
        url = `/places/filter?type=${placeType}`;
    }else {
        url = `/places/filter?type=${placeType}&radius=${radius}&lng=${currentPosition.longitude}&lat=${currentPosition.latitude}`;
    }
    response = await api.get(url);
  } catch (err) {
    console.log(err);
  }
  return response;
};

export const searchPlace = async (keyword) => {
    let response;
    try{
        response = await api.get(`/places/search?q=${keyword}`);
    }catch(err){
        console.log(err);
    }
    return response;
}

export const getDetailPlace = async (placeId) => {
  let response;
  try{
    response = await api.get(`/places?placeId=${placeId}`);
  }catch(err){
    console.log(err);
  }
  return response;
}
