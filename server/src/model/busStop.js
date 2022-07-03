import mongoose from 'mongoose';

const BusStopSchema = new mongoose.Schema(
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
        stop_type: {
            type: String
        },
        street: {
            type: String
        },
        locality: {
            type: String
        }
    },{
        versionKey: false
    }
);

const BusStop = mongoose.model('BusStop', BusStopSchema, 'BusStop');
export default BusStop;