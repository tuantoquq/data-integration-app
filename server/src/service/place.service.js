import CustomError from "../error/CustomError.js";
import { httpStatus, apiStatus } from "../constants/index.js";
import Place from "../model/place.js";

const PlaceService = {};

PlaceService.getAllPlace = async () => {
    let places = await Place.find();
    return places;
}
PlaceService.getPlaceById = async (placeId) => {
    let place = await Place.findOne({id: placeId});
    if(!place){
        throw new CustomError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiStatus.DATABASE_ERROR,
            `Did not find place with id: ${placeId}`
        );
    }
    
    return place;
}

PlaceService.getAllPlaceType = async () => {
    let placeType = await Place.find().select({place_type: 1}).distinct('place_type');
    return placeType;
}
export default PlaceService;