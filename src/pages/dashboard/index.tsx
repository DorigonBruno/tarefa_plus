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
  deleteDoc,
} from "firebase/firestore";
import Link from "next/link";

type DashboradProps = {
  user: {
    email: string;
  };
};

type TasksProps = {
  id: string;
  tarefa: string;
  user: string;
  public: boolean;
  created: Date;
};

export default function Dashboard({ user }: DashboradProps) {
  const [textArea, setTextArea] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<TasksProps[]>([]);

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

  async function handleDeleteTasks(id: string) {
    const docRef = doc(db, "tarefas", id);

    alert("Tarefa Excluida");
    await deleteDoc(docRef);
  }

  useEffect(() => {
    async function requestTasks() {
      const tasksRef = collection(db, "tarefas");

      const q = query(
        tasksRef,
        orderBy("created", "desc"),
        where("user", "==", user?.email)
      );

      onSnapshot(q, (snapshot) => {
        const list = [] as TasksProps[];

        snapshot.forEach((doc) => {
          list.push({
            created: doc.data().created,
            public: doc.data().public,
            tarefa: doc.data().tarefa,
            user: doc.data().user,
            id: doc.id,
          });
        });

        setTasks(list);
      });
    }

    requestTasks();
  }, [user?.email]);

  return (
    <div className="h-screen w-full bg-black flex flex-col">
      <main className="w-full max-w-5xl flex flex-col p-1 m-auto md:mt-10 mt-4">
        <h1 className="text-2xl mb-3 text-white">Qual sua Tarefa?</h1>
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
            <label htmlFor="check" className="cursor-pointer text-white">
              Deixar Tarefa Pública
            </label>
          </div>

          <button
            className="w-full text-center bg-blue-500 p-2 cursor-pointer mt-2 font-bold rounded-md text-white"
            type="submit"
          >
            Cadastrar Tarefa
          </button>
        </form>
      </main>

      <section className="bg-white w-full text-black mt-10">
        <div className="w-full max-w-5xl p-1 m-auto">
          <h1 className="text-center my-3 text-2xl md:my-5 md:text-4xl font-bold">
            Minhas Tarefas
          </h1>

          <div className="flex flex-col gap-2 mb-2">
            {tasks.map((task) => (
              <article
                key={task.id}
                className="border p-4 rounded-md border-gray-300"
              >
                {task.public && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-500 p-0.5 text-white rounded-sm text-xs md:text-sm">
                      Publica
                    </span>
                    <button>
                      <FaShare
                        size={18}
                        className="text-blue-500 cursor-pointer"
                      />
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Link href={`/tasks/${task.id}`}>
                    <p className="whitespace-pre-wrap text-base font-medium">
                      {task.tarefa}
                    </p>
                  </Link>
                  <button
                    className="cursor-pointer"
                    onClick={() => handleDeleteTasks(task.id)}
                  >
                    <FaTrash size={24} className="text-red-500" />
                  </button>
                </div>
              </article>
            ))}
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
