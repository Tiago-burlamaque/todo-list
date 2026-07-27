import { tarefaRepository } from "../repositories/tarefaRepository";

class TarefaService {
    validarCampos(titulo: string, descricao: string) {
        if (!titulo) throw new Error('O campo titulo é obrigatório.')
        if (!descricao) throw new Error('O campo descrição é obrigatório.')
    }

    limite(descricao: string) {
        if (descricao.length > 1200) throw new Error('A descrição deve ser até 1200 caracteres.')
    }

    async criar(titulo: string, descricao: string) {
        return await tarefaRepository.criarTarefa(titulo, descricao)
    }

    async pegarTodasTarefas() {
        const tarefas = await tarefaRepository.buscarTodasTarefas();

        if (tarefas.length === 0) {
            throw new Error("Nenhuma tarefa foi encontrada.");
        }

        return tarefas;
    }

    async editarTarefa(id: number, titulo: string, descricao: string) {
        this.validarCampos(titulo, descricao)

        return await tarefaRepository.editarTarefa(id, titulo, descricao)
    }

    async editarStatusConcluir(id: number) {
        return await tarefaRepository.editarStatusConcluido(id)
    }

    async editarStatusPendente(id: number) {
        return await tarefaRepository.editarStatusPendente(id)
    }

    async deletarTarefa(id: number) {
        return await tarefaRepository.deletarTarefa(id)
    }
}

export const tarefaService = new TarefaService()