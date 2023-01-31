import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';


export const getAllNotes = async (req, res, next) => {
    try {
        const data = await NoteService.getAllNotes();
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'All Notes fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const getNote = async (req, res, next) => {
    try {
        const data = await NoteService.getNote(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Note fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};


export const createNote = async (req, res, next) => {
    try {
        const data = await NoteService.createNote(req.body)
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Note created successfully'
        });
    } catch (error) {
        next(error)
    }
}

export const deleteNote = async (req, res, next) => {
    try {
        const data = await NoteService.deleteNote(req)
        res.status(HttpStatus.BAD_GATEWAY).json({
            code: HttpStatus.BAD_GATEWAY,
            data: data,
            message: 'Note deleted successfully'
        });
    } catch (error) {
        next(error)
    }
}

export const updateNote = async (req, res, next) => {
    try {
        const data = await NoteService.updateNote(req.params._id, req.body)
        console.log(req.params._id);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Note Updated successfully'
        });
    } catch (error) {
        next(error)
    }
}

export const noteTrash = async (req, res, next) => {
    try {
        const data = await NoteService.noteTrash(req)
        // console.log("<--------------------------->",req.params.UserId);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Note Updated successfully'
        });
    } catch (error) {
        next(error)
    }
}
export const noteArchieve = async (req, res, next) => {
    try {
        const data = await NoteService.noteArchieve(req)
        // console.log("<--------------------------->",req.params.UserId);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Note Updated successfully'
        });
    } catch (error) {
        next(error)
    }
}