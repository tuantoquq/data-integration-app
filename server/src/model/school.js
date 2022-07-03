import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
    {
        head_name: {
            type: String
        },
        telephone: {
            type: String
        },
        website: {
            type: String
        },
        Postcode: {
            type: String
        }
    },
    {
        versionKey: false
    }
);

const School = mongoose.model('School', SchoolSchema, 'School');
export default School;