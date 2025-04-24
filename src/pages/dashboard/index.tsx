import TextArea from "@/components/textarea";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { FaShare, FaTrash } from "react-icons/fa";

import { db } from "@/services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
} from "firebase/firestore";

type DashboradProps = {
  user: {
    email: string;
  };
};

export default function Dashboard({ user }: DashboradProps) {
  const [textArea, setTextArea] = useState("");
  const [publicTask, setPublicTask] = useState(false);

  function handleChangeTask(e: ChangeEvent<HTMLInputElement>) {
    setPublicTask(e.target.checked);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (textArea === "") {
      return;
    }

    try {
      await addDoc(collection(db, "tarefas"), {
        tarefa: textArea,
        created: new Date(),
        user: user?.email,
        public: publicTask,
      });

      alert("Tarefa Cadastrada");
      setTextArea("");
      setPublicTask(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="h-screen w-full">
      <main className="w-full h-6/12 max-w-5xl flex flex-col p-1 m-auto md:mt-10 mt-4">
        <h1 className="text-2xl mb-3">Qual sua Tarefa?</h1>
        <form onSubmit={handleSubmit}>
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
              checked={publicTask}
              onChange={handleChangeTask}
            />
            <label htmlFor="check" className="cursor-pointer">
              Deixar Tarefa Pública
            </label>
          </div>

          <button
            className="w-full text-center bg-blue-500 p-2 cursor-pointer mt-2 font-bold rounded-md"
            type="submit"
          >
            Cadastrar Tarefa
          </button>
        </form>
      </main>

      <section className="bg-white w-full h-6/12 text-black">
        <div className="w-full max-w-5xl p-1 m-auto">
          <h1 className="text-center my-3 text-2xl md:my-5 md:text-4xl font-bold">
            Minhas Tarefas
          </h1>

          <div className="flex flex-col gap-2 mb-2">
            <article className="border p-4 rounded-md border-gray-300">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-500 text-white p-1 text-xs md:text-sm rounded-md">
                    Pública
                  </span>
                  <button className="cursor-pointer">
                    <FaShare size={22} className="text-blue-500" />
                  </button>
                </div>

                <button className="cursor-pointer">
                  <FaTrash size={24} className="text-red-500" />
                </button>
              </div>

              <p className="whitespace-pre-wrap">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Delectus, corrupti architecto. Adipisci facere assumenda
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        email: session?.user.email,
      },
    },
  };
};
