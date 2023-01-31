import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    Title: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
    Colour: {
        type: String
    },
    UserId: {
        type: String
    },
    Token: {
        type: String,
        require: true
    },
    Archieve: {
        type: Boolean
    },
    Trash: {
        type: Boolean
    }
})

export default model('Notes', userSchema);