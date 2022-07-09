import { httpStatus, apiStatus } from "../constants/index.js";
import CustomError from "../error/CustomError.js";
import PlaceService from "../service/place.service.js";
import { PlaceType } from "../constants/placeType.js";
import SchoolService from "../service/school.service.js";
import BusStopService from "../service/busStop.service.js";
import StationService from "../service/station.service.js";

export const getAllPlace = async (req, res) => {
    try{    
        let places = await PlaceService.getAllPlace();
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: "get all place successfully",
            data: places
        });
    }catch(err){
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: err.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
}

export const getPlaceById = async (req, res) => {
    try{
        let placeId = req.query.placeId;
        let place = await PlaceService.getPlaceById(placeId);
        let detail;
        if(place.place_type === PlaceType.School){
            detail = await SchoolService.getSchoolById(placeId);
        }else if(place.place_type === PlaceType.BusStop){
            detail = await BusStopService.getBusStopByPlaceId(placeId);
        }else if(place.place_type === PlaceType.Station){
            detail = await StationService.getStationByPlaceId(placeId);
        }else {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: "Place type of Place is invalid!"
            });
        }
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: `get place by id ${placeId} successfully`,
            data: {
                place: place,
                detail: detail
            }
        });
    }catch(err){
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: err.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
}

export const getAllPlaceType = async (req, res) => {
    try{
        let listType = await PlaceService.getAllPlaceType();
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: "get list place type successfully",
            data: listType
        });
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
}

export const getAllPlaceWithFilter = async (req, res) => {
    try{
        let placeType = req.query.type;
        let radius = parseFloat(req.query.radius);
        let longitude = parseFloat(req.query.lng);
        let latitude = parseFloat(req.query.lat);

        let places = await PlaceService.getAllPlaceWithFilter(placeType);
        let response = [];
        if(radius === undefined || isNaN(radius)){
            response = places;
        }else {
            for (let p of places) {
                let distance = calculateDistance({longitude: longitude, latitude: latitude}, p);
                if (distance <= radius) {
                    response.push(p);
                }
            }
               
        }
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: "get places with filter successfully",
            data: response
        });
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        }); 
    }
}

export const search = async (req, res) => {
    try{
        let keyword = req.query.q;
        let places = await PlaceService.search(keyword);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: "search successfully",
            data: places
        });
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        }); 
    }
}

function calculateDistance(place1, place2) {
    const lat1Rad = toRadians(place1.latitude);
    const lat2Rad = toRadians(place2.latitude);
    const lng1Rad = toRadians(place1.longitude);
    const lng2Rad = toRadians(place2.longitude);

    const dlong = lng2Rad - lng1Rad;
    const dlat = lat2Rad - lat1Rad;
    const ans = Math.pow(Math.sin(dlat/2), 2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.pow(Math.sin(dlong/2), 2);
    const R = 6371;
    return R * 2 * Math.asin(Math.sqrt(ans));
}
function toRadians(degree){
    return degree * (Math.PI/180);
}