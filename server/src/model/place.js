import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        easting: {
            type: Number,
            required: true
        },
        northing: {
            type: Number,
            required: true
        },
        address: {
            type: String
        },
        description: {
            type: String
        },
        place_type: {
            type: String
        },
        metadata: {
            type: String
        }
    },
    {
        versionKey: false
    }
);

const Place = mongoose.model('Place', PlaceSchema, 'Place');
export default Place;