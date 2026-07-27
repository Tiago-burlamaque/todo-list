import { usuarioRepository } from "../repositories/usuarioRepository"
import bcrypt from 'bcrypt'

class UsuarioService {

    async login(email: string, senha: string) {
        this.validacaoLogin(email, senha);

        const user = await usuarioRepository.buscarEmail(email);

        if (!user) {
            throw new Error("E-mail ou senha inválidos.");
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            throw new Error("E-mail ou senha inválidos.");
        }

    }

    validacaoCadastro(nome: string, nick_name: string, email: string, senha: string) {
        if (!nome) throw new Error('O campo nome é obrigatório.')
        if (!nick_name) throw new Error('O campo nick_name é obrigatório.')
        if (!email) throw new Error('O campo email é obrigatório.')
        if (!senha) throw new Error('O campo senha é obrigatório.')

        if (senha.length < 8) throw new Error('A senha deve ter mais de 8 caracteres.')
    }

    validacaoLogin(email: string, senha: string) {
        if (!email) throw new Error('O campo email é obrigatório.')
        if (!senha) throw new Error('O campo senha é obrigatório.')
    }

    async verificarExisteUsuarioCadastro(email: string) {
        const usuario = await usuarioRepository.buscarEmail(email)

        if (usuario) throw new Error('E-mail já cadastrado.')
    }

    async verificarExisteUsuarioLogin(email: string) {
        const usuario = await usuarioRepository.buscarEmail(email)

        if (!usuario) throw new Error('Nenhum usuário encontrado.')
    }

    async hashSenha(senha: string) {
        const salts = 10
        return await bcrypt.hash(senha, salts)
    }

    async compararSenha(email: string, senha: string) {
        const user = await usuarioRepository.buscarEmail(email)

        if (!user) throw new Error('Usuário não encontrado.')

        return await bcrypt.compare(
            senha,
            user.senha
        )
    }

    async senhaValida(email: string, senha: string) {
        const valida = await this.compararSenha(email, senha)

        if (!valida) throw new Error('E-mail ou senha inválidos.')
    }
}

export const usuarioSerivce = new UsuarioService()