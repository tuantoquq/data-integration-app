import CustomError from '../error/CustomError.js';
import { httpStatus, apiStatus } from '../constants/index.js';
import Place from '../model/place.js';

const PlaceService = {};

PlaceService.getAllPlace = async () => {
    let places = await Place.find();
    return places;
};
PlaceService.getPlaceById = async (placeId) => {
    let place = await Place.findOne({ id: placeId });
    if (!place) {
        throw new CustomError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiStatus.DATABASE_ERROR,
            `Did not find place with id: ${placeId}`,
        );
    }

    return place;
};

PlaceService.getAllPlaceType = async () => {
    let placeType = await Place.find().select({ place_type: 1 }).distinct('place_type');
    return placeType;
};

PlaceService.getAllPlaceWithFilter = async (placeType) => {
    let condition = (placeType === "All" ? {}
                : {place_type: placeType})
    let places = await Place.find(condition);
    return places;
};

PlaceService.search = async (keyword) => {
    console.log(keyword);
    let places;
    if(keyword === undefined || keyword === ""){
        places = await Place.find();
    }else{
        places = await Place.find({$or: [{name: {$regex: new RegExp(`.*${keyword}.*`), $options: "i"}}
                    , {address: {$regex: new RegExp(`.*${keyword}.*`), $options: "i"}}]});
    }
    return places
}
PlaceService.updateCurrentPossion = async (lng, lat) => {
    const id = "current-position";
    let place = await Place.findOneAndUpdate({id: id}, {
        longitude: lng, 
        latitude: lat
    }, {new: true});
    return place;
}
PlaceService.getCurrentPosition = async () => {
    const currentPlace = await Place.findOne({id: "current-position"});
    return currentPlace;
}
export default PlaceService;
