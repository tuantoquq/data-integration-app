import CustomError from "../error/CustomError.js";
import {httpStatus, apiStatus} from '../constants/index.js';
import SchoolService from "../service/school.service.js";

export const getAllSchool = async (req, res) => {
    try{
        let schools = await SchoolService.findAllSchool();
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: "get all school successfully",
            data: schools
        });
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
}

export const getSchoolById = async (req, res) => {
    try {
        let schoolId = req.query.schoolId;
        let school = await SchoolService.getSchoolById(schoolId);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: "get school by id successfully",
            data: school
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