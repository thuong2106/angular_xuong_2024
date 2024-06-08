import express from 'express';
import { getUser, login, register, removeUser } from '../controllers/user.controller.js';

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get("/", getUser);
router.delete("/:id", removeUser);

export default router;