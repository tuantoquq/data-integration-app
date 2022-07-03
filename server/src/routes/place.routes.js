import express from 'express';
import { getAllPlace, getAllPlaceType, getPlaceById } from '../controller/place.controller.js';

const placeRoutes = express.Router();

placeRoutes.get('/api/v1/places/all', getAllPlace);
placeRoutes.get('/api/v1/places', getPlaceById);
placeRoutes.get('/api/v1/places/list-type', getAllPlaceType);
export default placeRoutes;