import { app } from "./app";
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`)
    console.log(`Acesse a url http://localhost:${port}.`)
})