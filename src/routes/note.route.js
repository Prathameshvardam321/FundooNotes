import express from 'express';
import * as userController from '../controllers/note.controller';
import { newNotesValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get("/", userController.getAllNotes)

router.post('/', newNotesValidator, userController.createNote)

//route to get user
router.get('/:_id', userController.getNote)

router.delete("/:_id", userController.deleteNote)

router.put("/:_id", userController.updateNote)

export default router;