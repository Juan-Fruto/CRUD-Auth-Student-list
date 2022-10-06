import {Schema, model} from 'mongoose';

const studentsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        grade: {
            type: Number,
            required: true
        },
        status:{
            type: Boolean,
            required: true,
            default: false
        }
    },{
        timestamps: true,
        versionKey: false
    }
);

export default model('Stdn', studentsSchema);
