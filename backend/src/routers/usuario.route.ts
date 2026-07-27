import { Router } from "express";
import { usuarioController } from "../controllers/usuario.controller.js";

export const usuarioRouter = Router()

usuarioRouter.post('/cadastro', usuarioController.cadastro)
usuarioRouter.post('/login', usuarioController.login)