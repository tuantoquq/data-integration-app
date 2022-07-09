import CustomError from "../error/CustomError.js";
import {httpStatus, apiStatus} from '../constants/index.js';
import BusStop from "../model/busStop.js";

const BusStopService = {};
BusStopService.getBusStopByPlaceId = async (placeId) => {
    let bus = await BusStop.findOne({id: placeId});
    if(!bus){
        throw new CustomError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiStatus.DATABASE_ERROR,
            `Did not busStop with placeId: ${placeId}`
        );
    }
    return bus;
}


export default BusStopService;