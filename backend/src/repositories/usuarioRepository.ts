import { prisma } from "../../lib/prisma";

class UsuarioRepository {
    buscarEmail(email: string) {
        return prisma.usuario.findUnique({
            where: {
                email: email
            }
        })
    }

    criarDados(nome: string, nick_name: string, email: string, senha: string) {
        return prisma.usuario.create({
            data: {
                nome: nome,
                nick_name: nick_name,
                email: email,
                senha: senha
            }
        })
    }
}

export const usuarioRepository = new UsuarioRepository()