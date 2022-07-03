import api from '../service/ApiConfig.js';
export const getAllPlace = async () => {
    let response;
    try{
        response = api.get('/places/all');
    }catch(err){
        console.log(err);
    }
    return response;
}

export const getPlaceById = async (placeId) => {
    let response;
    try{
        response = api.get(`/places?placeId=${placeId}`);
    }catch(err){
        console.log(err);
    }
    return response;
}