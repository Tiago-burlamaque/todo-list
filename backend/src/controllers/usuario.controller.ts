import { usuarioRepository } from "../repositories/usuarioRepository";
import { usuarioSerivce } from "../services/usuario.service";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface User {
    id: number
    nome: string
    email: string
    nick_name: string
    senha: string
}

class UsuarioController {
    async cadastro(req: Request, res: Response) {
        try {
            const { nome, email, nick_name, senha } = req.body as User

            usuarioSerivce.validacaoCadastro(nome, email, nick_name, senha)

            await usuarioSerivce.verificarExisteUsuarioCadastro(email)

            const hashSenha = await usuarioSerivce.hashSenha(senha)

            const user = await usuarioRepository.criarDados(nome, nick_name, email, hashSenha)

            return res.status(201).json({
                message: "Usuário criado com sucesso.", user
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno servidor."
            })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body as User

            await usuarioSerivce.login(email, senha)

            const user = await usuarioRepository.buscarEmail(email)

            if (!user) throw new Error('Usuário não encontrado.')

            const jwtSecret = process.env.JWT_SECRET;

            if (!jwtSecret) throw new Error('JWT_SECRET não definida')

            const token = jwt.sign({
                id: user.id,
                nome: user.nome,
                nick_name: user.nick_name,
                email: user.email
            }, jwtSecret, {
                expiresIn: '7d'
            })

            return res.status(200).json({
                message: "Usuário logado com sucesso.", token
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno no servidor."
            })
        }
    }
}

export const usuarioController = new UsuarioController()