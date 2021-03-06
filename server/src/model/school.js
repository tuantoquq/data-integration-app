import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
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
        head_name: {
            type: String
        },
        telephone: {
            type: String
        },
        website: {
            type: String
        },
        postcode: {
            type: String
        }
    },
    {
        versionKey: false
    }
);

const School = mongoose.model('School', SchoolSchema, 'School');
export default School;