import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CiTrash } from "react-icons/ci";
import { MdOutlinePendingActions, MdOutlineTaskAlt } from "react-icons/md";

export default function Home() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const token = localStorage.getItem('token')

  const navigate = useNavigate()

  const [tarefas, setTarefas] = useState([]);

  const [loadingCriar, setLoadingCriar] = useState(false);
  const [loadingExcluir, setLoadingExcluir] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [idEditar, setIdEditar] = useState(null);

  const [tituloEditar, setTituloEditar] = useState("");
  const [descricaoEditar, setDescricaoEditar] = useState("");

  const [loadingEditar, setLoadingEditar] = useState(false);
  const [loadingConcluir, setLoadingConcluir] = useState(null);

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  function abrirModal(tarefa) {
    setIdEditar(tarefa.id);
    setTituloEditar(tarefa.titulo);
    setDescricaoEditar(tarefa.descricao);
    setOpenModal(true);
  }

  async function atualizarTarefa(e) {
    e.preventDefault();

    setLoadingEditar(true);

    try {
      const res = await axios.put(
        `http://localhost:3000/tarefa/${idEditar}`,
        {
          titulo: tituloEditar,
          descricao: descricaoEditar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Tarefa atualizada.");

      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingEditar(false);
    }
  }

  async function deixarTarefaPendente(id) {
    setLoadingConcluir(id);

    try {
      const res = await axios.put(
        `http://localhost:3000/tarefa/pendente/${id}`,
        {
          status: "Pendente"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.warning("Tarefa pendente.");

      window.location.reload();

    } catch (error) {
      console.log(error);
    } finally {
      setLoadingConcluir(null);
    }
  }

  async function concluirTarefa(id) {
    setLoadingConcluir(id);

    try {
      const res = await axios.put(
        `http://localhost:3000/tarefa/concluir/${id}`,
        {
          status: "Concluida"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Tarefa concluída.");
      window.location.reload();

    } catch (error) {
      console.log(error);
    } finally {
      setLoadingConcluir(null);
    }
  }

  useEffect(() => {
    if (!token) navigate('/')
  })

  useEffect(() => {
    buscarTarefas();
  }, []);

  async function buscarTarefas() {
    try {
      const res = await axios.get('http://localhost:3000/tarefa', {
        params: {
          titulo,
          descricao
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setTarefas(res.data.tarefas)

    } catch (error) {
      console.log(error)
    }
  }

  async function criarTarefa(e) {
    e.preventDefault();

    setLoadingCriar(true);

    try {
      const res = await axios.post('http://localhost:3000/tarefa', {
        titulo: titulo,
        descricao: descricao
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

      toast.success("tarefa criada com sucesso.")
      window.location.reload();
    } finally {
      setLoadingCriar(false);
    }
  }

  async function excluir(id) {
    setLoadingExcluir(id);

    try {
      const res = await axios.delete(`http://localhost:3000/tarefa/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      toast.success("Tarefa excluida com sucesso.")
      window.location.reload();
    } finally {
      setLoadingExcluir(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-900">
            Minhas tarefas
          </h1>

          <button className="rounded-xl bg-black px-5 py-3 text-white hover:bg-gray-800 transition" onClick={handleLogout

          }>
            Sair
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl p-8 grid lg:grid-cols-3 gap-8">

        {/* Formulário */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 h-fit">

          <h2 className="text-xl font-semibold mb-6">
            Nova tarefa
          </h2>

          <form
            onSubmit={criarTarefa}
            className="space-y-5"
          >

            <div>

              <label className="block mb-2 text-sm font-medium">
                Título
              </label>

              <input
                type="text"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-gray-400 focus:bg-white transition"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-medium">
                Descrição
              </label>

              <textarea
                required
                rows={5}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-gray-400 focus:bg-white transition"
              />

            </div>

            <button
              disabled={loadingCriar}
              className="w-full rounded-xl bg-black py-3 text-white font-medium hover:bg-gray-800 disabled:opacity-60"
            >
              {loadingCriar
                ? "Adicionando..."
                : "Adicionar tarefa"}
            </button>

          </form>

        </div>

        {/* Lista */}

        <div className="lg:col-span-2 space-y-5">

          {tarefas.length === 0 && (

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">

              <h2 className="text-xl font-semibold">
                Nenhuma tarefa encontrada
              </h2>

              <p className="text-gray-500 mt-2">
                Crie sua primeira tarefa.
              </p>

            </div>

          )}

          {tarefas.map((tarefa) => (

            <div
              key={tarefa.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-xl font-semibold text-gray-900">
                    {tarefa.titulo}
                  </h2>

                  <p className="text-gray-500 mt-3">
                    {tarefa.descricao}
                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => abrirModal(tarefa)}
                    className="rounded-xl border border-gray-200 px-5 py-2 hover:bg-gray-100 transition"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => excluir(tarefa.id)}
                    disabled={loadingExcluir === tarefa.id}
                    className="rounded-xl bg-black px-5 py-2 text-xl text-white font-medium hover:bg-gray-800 disabled:opacity-60 transition duration-300"
                  >
                    {loadingExcluir === tarefa.id
                      ? <CiTrash />
                      : <CiTrash />}
                  </button>

                  <button
                    onClick={() =>
                      tarefa.status === "Pendente"
                        ? concluirTarefa(tarefa.id)
                        : deixarTarefaPendente(tarefa.id)
                    }
                    disabled={loadingConcluir === tarefa.id}
                    className={`rounded-xl px-5 py-2 text-white text-xl transition  disabled:opacity-60 ${tarefa.status === "Concluida"
                      ? "bg-black hover:bg-gray-800"
                      : "bg-black hover:bg-gray-800"
                      }`}
                  >
                    {loadingConcluir === tarefa.id
                      ? "Atualizando..."
                      : tarefa.status === "Concluida"
                        ? <MdOutlineTaskAlt />
                        : <MdOutlinePendingActions />}
                  </button>
                </div>

              </div>
            </div>

          ))}

          {openModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">

              <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-2xl font-semibold">
                    Editar tarefa
                  </h2>

                  <button
                    onClick={() => setOpenModal(false)}
                    className="text-2xl text-gray-400 hover:text-gray-700"
                  >
                    ×
                  </button>

                </div>

                <form
                  onSubmit={atualizarTarefa}
                  className="space-y-5"
                >

                  <div>

                    <label className="block mb-2 text-sm font-medium">
                      Título
                    </label>

                    <input
                      type="text"
                      required
                      value={tituloEditar}
                      onChange={(e) =>
                        setTituloEditar(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-gray-400"
                    />

                  </div>

                  <div>

                    <label className="block mb-2 text-sm font-medium">
                      Descrição
                    </label>

                    <textarea
                      rows={5}
                      required
                      value={descricaoEditar}
                      onChange={(e) =>
                        setDescricaoEditar(e.target.value)
                      }
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-gray-400"
                    />

                  </div>

                  <button
                    disabled={loadingEditar}
                    className="w-full rounded-xl bg-black py-3 text-white hover:bg-gray-800 disabled:opacity-60"
                  >
                    {loadingEditar
                      ? "Atualizando..."
                      : "Atualizar"}
                  </button>

                </form>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}