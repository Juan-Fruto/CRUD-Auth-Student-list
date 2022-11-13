import { Schema, model } from "mongoose";

const groupSchema = new Schema(
    {
        subeject_grade: {
            type: String,
            required: true,
            unique: false
        },
        group: {
            type: String,
            required: false,
            unique: false
        },
        career: {
            type: String,
            required: true,
            unique: false
        },
        students: [
            {
                name: {
                    type: String,
                    required: true,
                    unique: true,
                    trim: true
                },
                grade: {
                    type: Number,
                    required: false
                },
                status: {
                    type: Boolean,
                    required: true,
                    default: false
                }
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Group', groupSchema);