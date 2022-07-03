import { httpStatus, apiStatus } from "../constants/index.js";
import CustomError from "../error/CustomError.js";
import PlaceService from "../service/place.service.js";

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
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: `get place by id ${placeId} successfully`,
            data: place
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