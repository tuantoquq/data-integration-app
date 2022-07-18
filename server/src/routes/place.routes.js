import express from 'express';
import { getAllPlace, getAllPlaceType, getAllPlaceWithFilter, getPlaceById, search, updateCurrentPossion } from '../controller/place.controller.js';

const placeRoutes = express.Router();

placeRoutes.get('/api/v1/places/all', getAllPlace);
placeRoutes.get('/api/v1/places', getPlaceById);
placeRoutes.get('/api/v1/places/list-type', getAllPlaceType);
placeRoutes.get('/api/v1/places/filter', getAllPlaceWithFilter);
placeRoutes.get('/api/v1/places/search', search);
placeRoutes.post('/api/v1/places/update-current', updateCurrentPossion);
export default placeRoutes;