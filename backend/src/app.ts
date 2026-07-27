import express, { Request, Response } from 'express'
import cors from 'cors'
import { authMiddleware } from './middleware/authMiddleware.js'
import { usuarioRouter } from './routers/usuario.route.js'
import { tarefaRouter } from './routers/tarefa.route.js'

const app = express()

app.use(express.json())
app.use(cors({
    origin: "https://smarthealth-city.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}))

app.get('/', (req: Request, res: Response) => {
    res.send('hello world!')
})

app.use('/auth', usuarioRouter)
app.use('/tarefa', authMiddleware, tarefaRouter)

export default app;