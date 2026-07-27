import { prisma } from '../../lib/prisma'

class TarefaRepository {
    buscarTodasTarefas() {
        return prisma.tarefa.findMany()
    }

    criarTarefa(titulo: string, descricao: string) {
        return prisma.tarefa.create({
            data: {
                titulo: titulo,
                descricao: descricao,
                status: "Pendente"
            }
        })
    }

    deletarTarefa(id: number) {
        return prisma.tarefa.delete({
            where: {
                id: id
            }
        })
    }

    editarTarefa(id: number, titulo: string, descricao: string) {
        return prisma.tarefa.update({
            where: {
                id: id
            },
            data: {
                titulo: titulo,
                descricao: descricao,
            }
        })
    }

    editarStatusConcluido(id: number) {
        return prisma.tarefa.update({
            where: {
                id: id
            },
            data: {
                status: "Concluida"
            }
        })
    }

    editarStatusPendente(id: number) {
        return prisma.tarefa.update({
            where: {
                id: id
            },
            data: {
                status: "Pendente"
            }
        })
    }
}

export const tarefaRepository = new TarefaRepository()