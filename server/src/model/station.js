import mongoose from "mongoose";

const StationSchema = new mongoose.Schema(
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
        station_type: {
            type: String
        },
        street: {
            type: String
        }
    },
    {
        versionKey: false
    }
);

const Station = mongoose.model('Station', StationSchema, 'Station');
export default Station;