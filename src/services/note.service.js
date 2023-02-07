import Notes from '../models/note.model'
import { toggle } from '../utils/toggle';

//create a note
export const createNote = async (body) => {
    const data = await Notes.create(body)
    return data
}

//getAll
export const getAllNotes = async (body) => {
    const data = await Notes.find({ UserId: body.UserId });
    return data;
};

//getOneUser
export const getNote = async (_id) => {
    const data = await Notes.findById(_id)
    return data
}

//delete a note
export const deleteNote = async (req) => {
    try {
        const data = await Notes.findByIdAndDelete(req.params._id)
        return " "
    } catch (error) {
        next(error)
    }
}

export const updateNote = async (_id, body) => {

    if (!body.Description || !body.Title) {
        return 'Not entered details Properly'
    }
    const data = await Notes.findByIdAndUpdate({ _id: _id }, body, { new: true })
    return data
}

export const noteTrash = async (body) => {
    const data = await Notes.findOne({ "_id": body.params.id })
    const { Trash } = data
    const data1 = await Notes.findByIdAndUpdate({ "_id": body.params.id }, { Trash: toggle(Trash) }, { new: true })
    return data1
}

export const noteArchieve = async (body) => {
    const data = await Notes.findOne({ "_id": body.params.id })
    console.log(data);
    const { Archieve } = data
    const data1 = await Notes.findByIdAndUpdate({ "_id": body.params.id }, { Archieve: toggle(Archieve) }, { new: true })
    return data1
}
