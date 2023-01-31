import express from 'express';
import * as userController from '../controllers/note.controller';
import { newNotesValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get("/", userAuth, userController.getAllNotes)

router.post('/', newNotesValidator, userAuth, userController.createNote)

router.get('/:_id', userAuth, userController.getNote)

router.delete("/:_id", userAuth, userController.deleteNote)

router.put("/:_id", newNotesValidator, userAuth, userController.updateNote)

router.patch("/:id/Trash", userController.noteTrash)

router.put("/:id/Archieve", userController.noteArchieve)

export default router;