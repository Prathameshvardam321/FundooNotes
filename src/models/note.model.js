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
    Trash: {
        type: Boolean,
        default: false
    },
    Archieve: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }

)

export default model('Notes', userSchema);