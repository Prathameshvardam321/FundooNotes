import Notes from '../models/note.model'


//getAll
export const getAllUsers = async () => {
    const data = await Notes.find();
    return data;
};

//getOneUser
export const getUser = async (_id) => {
    const data = await Notes.findById(_id)
    return data
}


//create a note
export const createNote = async (body) => {
    const data = await Notes.create(body)
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
