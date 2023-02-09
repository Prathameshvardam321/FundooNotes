import Notes from '../models/note.model'
import { toggle } from '../utils/toggle';
import { client, status } from '../config/redis'

// client.set = util.promisify(client.set)
//create a note
export const createNote = async (body) => {
    
    const data = await Notes.create(body)
    if(data!==null){
        console.log("Enter in flushing");
        client.flushAll()
    }
    return data
}

//getAll
export const getAllNotes = async (body) => {
    const data = await Notes.find({ UserId: body.UserId });
    if (status) {
        client.set(`Note-${body.UserId}`, JSON.stringify(data))
    }
    return data;
};

//getOneUser
export const getNote = async (_id, req) => {

    const data = await Notes.findById(_id)
    client.set(`Note-${req.params._id}`, JSON.stringify(data))
    return data
}

//delete a note
export const deleteNote = async (req) => {
    try {
        
        const data = await Notes.findByIdAndDelete(req.params._id)
        if(data!==null){
            console.log("Enter in flushing");
            client.flushAll()
        }
        return " "
    } catch (error) {

    }
}

export const updateNote = async (_id, body) => {
    
    const data = await Notes.findByIdAndUpdate({ "_id": _id }, body, { new: true })
    if(data!==null){
        console.log("Enter in flushing");
        client.flushAll()
    }
    return data
   
}

export const noteTrash = async (body) => {
    client.flushAll()
    const data = await Notes.findOne({ "_id": body.params.id })
    const { Trash } = data
    const data1 = await Notes.findByIdAndUpdate({ "_id": body.params.id }, { Trash: toggle(Trash) }, { new: true })
    if(data1!==null){
        console.log("Enter in flushing");
        client.flushAll()
    }
    return data1
}

export const noteArchieve = async (body) => {
   
    const data = await Notes.findOne({ "_id": body.params.id })
    console.log(data);
    const { Archieve } = data
    const data1 = await Notes.findByIdAndUpdate({ "_id": body.params.id }, { Archieve: toggle(Archieve) }, { new: true })
    if(data1!==null){
        console.log("Enter in flushing");
        client.flushAll()
    }
    return data1
}
