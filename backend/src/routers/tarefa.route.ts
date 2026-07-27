import { Router } from "express";
import { tarefaController } from "../controllers/tarefa.controller";

export const tarefaRouter = Router()

tarefaRouter.get('/', tarefaController.get)
tarefaRouter.post('/', tarefaController.post)
tarefaRouter.put('/:id', tarefaController.edit)
tarefaRouter.put('/concluir/:id', tarefaController.editConcluir)
tarefaRouter.put('/pendente/:id', tarefaController.editPendente)
tarefaRouter.delete('/:id', tarefaController.delete)