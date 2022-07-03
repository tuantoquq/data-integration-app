import CustomError from "../error/CustomError.js";
import {httpStatus, apiStatus} from '../constants/index.js';
import Station from "../model/station.js";

const StationService = {};

StationService.getStationByPlaceId = async (placeId) => {
    let station = await Station.findOne({id: placeId});
    if(!station){
        throw new CustomError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiStatus.DATABASE_ERROR,
            `Did not find station with placeId: ${placeId}`
        );
    }
    return station;
}

export default StationService;