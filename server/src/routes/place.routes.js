import express from 'express';
import { getAllPlace, getPlaceById } from '../controller/place.controller.js';

const placeRoutes = express.Router();

placeRoutes.get('/api/v1/places/all', getAllPlace);
placeRoutes.get('/api/v1/places', getPlaceById);
export default placeRoutes;