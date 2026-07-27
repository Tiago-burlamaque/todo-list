import { useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [nomeRegister, setNomeRegister] = useState('');
    const [emailRegister, setEmailRegister] = useState('');
    const [nickNameRegister, setNickNameRegister] = useState('');
    const [senhaRegister, setSenhaRegister] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [openModal, setOpenModal] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) navigate('/home')
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        setCarregando(true)
        try {
            const res = await axios.post('http://localhost:3000/auth/login', {
                email: email,
                senha: senha
            })

            toast.success("Usuário logado com sucesso.")

            setCarregando(false)

            localStorage.setItem('token', res.data.token)

            navigate('/home')
        } catch (error) {
            if (error.status === 500) {
                toast.error('E-mail ou senha inválidos.')
            }
            console.log(error)
            setCarregando(false)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setCarregando(true)
        try {
            await axios.post('http://localhost:3000/auth/cadastro', {
                nome: nomeRegister,
                nick_name: nickNameRegister,
                email: emailRegister,
                senha: senhaRegister
            })

            toast.success("Usuário cadastrado com sucesso.")

            setCarregando(false)

            setOpenModal(false)

        } catch (error) {
            if (error.status === 500) {
                toast.error("E-mail já cadastrado.")
            }
            console.log(error)
            setCarregando(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            {/* Card Login */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900">Bem-vindo</h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Entre na sua conta para continuar
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            E-mail
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="voce@exemplo.com"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <button
                                type="button"
                                className="text-sm text-gray-500 hover:text-gray-700 transition"
                            >
                                Esqueceu?
                            </button>
                        </div>

                        <input
                            type="password"
                            placeholder="••••••••"
                            rvalue={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required

                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={carregando}
                        className="flex h-12 w-full items-center justify-center rounded-xl bg-black text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {carregando ? (
                            <>
                                <svg
                                    className="mr-2 h-5 w-5 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        opacity=".25"
                                    />

                                    <path
                                        d="M22 12a10 10 0 00-10-10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                Entrando...
                            </>
                        ) : (
                            "Entrar"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Não possui uma conta?{" "}
                    <button
                        onClick={() => setOpenModal(true)}
                        className="text-gray-900 font-medium hover:underline"
                    >
                        Criar conta
                    </button>
                </div>
            </div>

            {/* Modal Cadastro */}
            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 relative">
                        <button
                            onClick={() => setOpenModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                        >
                            ×
                        </button>

                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Criar conta
                            </h2>
                            <p className="text-gray-500 mt-2 text-sm">
                                Preencha os dados para começar
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={handleRegister}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    placeholder="Seu nome"
                                    value={nomeRegister}
                                    onChange={(e) => setNomeRegister(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-gray-400 focus:bg-white transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nick Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Seu nome"
                                    value={nickNameRegister}
                                    onChange={(e) => setNickNameRegister(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-gray-400 focus:bg-white transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    placeholder="voce@exemplo.com"
                                    value={emailRegister}
                                    onChange={(e) => setEmailRegister(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-gray-400 focus:bg-white transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={senhaRegister}
                                    onChange={(e) => setSenhaRegister(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-gray-400 focus:bg-white transition"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-gray-900 py-3 text-white font-medium hover:bg-gray-800 transition mt-2"
                            >
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}