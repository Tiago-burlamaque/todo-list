import express from 'express'
import cors from 'cors'
import { authMiddleware } from './middleware/authMiddleware'
import { usuarioRouter } from './routers/usuario.route'
import { tarefaRouter } from './routers/tarefa.route'

export const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', usuarioRouter)
app.use('/tarefa', authMiddleware, tarefaRouter)