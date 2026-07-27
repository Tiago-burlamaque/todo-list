import express, { Request, Response } from 'express'
import cors from 'cors'
import { authMiddleware } from './middleware/authMiddleware.js'
import { usuarioRouter } from './routers/usuario.route.js'
import { tarefaRouter } from './routers/tarefa.route.js'

export const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('hello world!')
})

app.use('/auth', usuarioRouter)
app.use('/tarefa', authMiddleware, tarefaRouter)