import express from 'express';
import { getAllSchool, getSchoolById } from '../controller/school.controller.js';

const schoolRoutes = express.Router();

schoolRoutes.get('/api/v1/schools/all', getAllSchool);
schoolRoutes.get('/api/v1/schools', getSchoolById);

export default schoolRoutes;