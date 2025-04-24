import TextArea from "@/components/textarea";
import { ChangeEvent, useState } from "react";
import { FaShare, FaTrash } from "react-icons/fa";

export default function Dashboard() {
  const [textArea, setTextArea] = useState("");

  return (
    <div className="flex flex-col w-full h-screen">
      <main className="w-full max-w-5xl flex flex-col p-1 m-auto md:mt-10 mt-4">
        <h1 className="text-2xl mb-3">Qual sua Tarefa?</h1>
        <form>
          <TextArea
            placeholder="Digite a tarefa"
            value={textArea}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setTextArea(e.target.value)
            }
          />

          <div className="flex items-center gap-1 my-3">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer"
              id="check"
              name="check"
            />
            <label htmlFor="check" className="cursor-pointer">
              Deixar Tarefa Pública
            </label>
          </div>

          <button
            className="w-full text-center bg-blue-500 p-2 cursor-pointer mt-2 font-bold"
            type="submit"
          >
            Cadastrar Tarefa
          </button>
        </form>
      </main>

      <section className="bg-white w-full text-black mt-5">
        <div className="w-full max-w-5xl p-1 m-auto">
          <h1 className="text-center my-5 text-4xl font-bold">
            Minhas Tarefas
          </h1>

          <div className="flex flex-col gap-2 mb-2">
            <article className="border p-4 rounded-md border-gray-300">
              <div className="flex items-center gap-1 mb-1">
                <span className="bg-blue-500 text-white">Pública</span>
                <button>
                  <FaShare size={22} className="text-blue-500" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="whitespace-pre-wrap">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Delectus, corrupti architecto. Adipisci facere assumenda
                </p>
                <button>
                  <FaTrash size={24} className="text-red-500" />
                </button>
              </div>
            </article>
            <article className="border p-4 rounded-md border-gray-300">
              <div className="flex items-center gap-1 mb-1">
                <span className="bg-blue-500 text-white">Pública</span>
                <button>
                  <FaShare size={22} className="text-blue-500" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="whitespace-pre-wrap">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Delectus, corrupti architecto. Adipisci facere assumenda
                </p>
                <button>
                  <FaTrash size={24} className="text-red-500" />
                </button>
              </div>
            </article>
            <article className="border p-4 rounded-md border-gray-300">
              <div className="flex items-center gap-1 mb-1">
                <span className="bg-blue-500 text-white">Pública</span>
                <button>
                  <FaShare size={22} className="text-blue-500" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="whitespace-pre-wrap">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Delectus, corrupti architecto. Adipisci facere assumenda
                </p>
                <button>
                  <FaTrash size={24} className="text-red-500" />
                </button>
              </div>
            </article>
            <article className="border p-4 rounded-md border-gray-300">
              <div className="flex items-center gap-1 mb-1">
                <span className="bg-blue-500 text-white">Pública</span>
                <button>
                  <FaShare size={22} className="text-blue-500" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="whitespace-pre-wrap">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Delectus, corrupti architecto. Adipisci facere assumenda
                </p>
                <button>
                  <FaTrash size={24} className="text-red-500" />
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
