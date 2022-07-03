import CustomError from "../error/CustomError.js";
import {httpStatus, apiStatus} from '../constants/index.js';
import School from "../model/school.js";

const SchoolService = {};

SchoolService.findAllSchool = async () => {
    let schools = await School.find();
    return schools;
}

SchoolService.getSchoolById = async (schoolId) => {
    let school = await School.findById(schoolId);
    if(!school){
        throw new CustomError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiStatus.DATABASE_ERROR,
            `Did not find school with id ${schoolId}`
        );
    }
    return school;
}

export default SchoolService;