import { Request, Response } from "express";
import { tarefaService } from "../services/tarefa.service.js";
import { tarefaRepository } from "../repositories/tarefaRepository.js";

interface Tarefa {
    titulo: string
    descricao: string
}

class TarefaController {
    async get(req: Request, res: Response) {
        try {
            const tarefas = await tarefaService.pegarTodasTarefas()

            return res.status(200).json({
                tarefas
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno no servidor."
            })
        }
    }

    async post(req: Request, res: Response) {
        try {
            const { titulo, descricao } = req.body as Tarefa

            tarefaService.validarCampos(titulo, descricao)

            const tarefaCriada = await tarefaService.criar(titulo, descricao)

            tarefaService.limite(descricao)

            return res.status(201).json({
                message: "Tarefa registrada com sucesso.", tarefaCriada
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno no servidor."
            })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)

            await tarefaService.deletarTarefa(id)

            return res.status(200).json({
                message: "Tarefa deletada com sucesso."
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno no servidor."
            })
        }
    }

    async edit(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const { titulo, descricao } = req.body as Tarefa

            const tarefaAtualizada = await tarefaService.editarTarefa(id, titulo, descricao)

            tarefaService.limite(descricao)

            return res.status(200).json({
                message: "Tarefa atualizada.",
                tarefaAtualizada
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno no servidor."
            })
        }
    }

    async editConcluir(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)

            const concluir = await tarefaRepository.editarStatusConcluido(id)

            return res.status(200).json({
                message: "Tarefa concluida com sucesso.",
                concluir
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno no servidor."
            })
        }
    }

    async editPendente(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)

            const pendente = await tarefaRepository.editarStatusPendente(id)

            return res.status(200).json({
                message: "Tarefa concluida com sucesso.",
                pendente
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno no servidor."
            })
        }
    }
}

export const tarefaController = new TarefaController()