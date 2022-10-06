import {Schema, model, models} from 'mongoose';
import brcypt from 'bcryptjs'

const usersSchema = new Schema(
    {
        names: {
            type: String,
            required: true,
            unique: false,
            trim: false
        },
        lastName: {
            type: String,
            required: true,
            unique: false,
            trim: false
        },
        group: {
            type: String,
            required: false,
            unique: false,
            trim: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            unique: false,
            trim: false 
        }
    }
);

//encriptación de la contraseña

usersSchema.methods.encryptPassword = async function (password){
    const salt = await brcypt.genSalt(10);
    const hash = brcypt.hash(password, salt);
    return hash;
};

usersSchema.methods.matchPassword = async function (password){
    return await brcypt.compare(password, this.password);
}

export default model('Users', usersSchema);