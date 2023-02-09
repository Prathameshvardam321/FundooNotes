import express from 'express';
import * as userController from '../controllers/note.controller';
import { newNotesValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { cacheGetAllNotes ,cacheGetNoteById} from '../middlewares/auth.middleware';
const router = express.Router();

router.get("",cacheGetAllNotes, userController.getAllNotes)

router.post('', newNotesValidator, userController.createNote)

router.get('/:_id',cacheGetNoteById, userController.getNote)

router.delete("/:_id", userController.deleteNote)

router.put("/:_id", userController.updateNote)

router.put("/:id/Trash", userController.noteTrash)

router.put("/:id/Archieve", userController.noteArchieve)

export default router;