import express from "express";
import { createUser, loginUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

//registrar um novo usuário
router.post("/register", createUser);

//fazer login
router.post("/login", loginUser);

//atualizar o perfil do usuário
router.put("/update", updateUser);

export default router;

