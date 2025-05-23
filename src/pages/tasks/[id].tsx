import { GetServerSideProps } from "next";
import Head from "next/head";
import { db } from "../../services/firebaseConnection";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import TextArea from "@/components/textarea";
import { ChangeEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

type TasksProps = {
  item: {
    tarefa: string;
    public: boolean;
    created: string;
    user: string;
    taskId: string;
  };
  allComments: CommentsProps[];
};

type CommentsProps = {
  id: string;
  taskId: string;
  comment: string;
  name: string;
  user: string;
};

export default function Tasks({ item, allComments }: TasksProps) {
  const [textArea, setTextArea] = useState("");
  const [comments, setComments] = useState<CommentsProps[]>(allComments || []);
  const { data: session } = useSession();

  async function handleAddComment() {
    if (textArea === "") {
      toast.error("Digite algum comentário");
      return;
    }

    if (!session?.user?.email || !session?.user?.name) return;

    try {
      const docRef = await addDoc(collection(db, "comentarios"), {
        comment: textArea,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item.taskId,
      });

      const data = {
        id: docRef.id,
        comment: textArea,
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId,
      };

      toast.success("Comentário cadastrado");
      setComments((prev) => [...prev, data]);
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteComment(id: string) {
    const commentFilter = comments.filter((comment) => comment.id !== id);

    try {
      const docRef = doc(db, "comentarios", id);

      await deleteDoc(docRef);
      toast.error("comentário deletado");
      setComments(commentFilter);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full h-full bg-white pt-10 pb-30 px-2">
      <Head>
        <title>Tasks - Comentários</title>
      </Head>

      <main className="w-full h-full max-w-5xl m-auto">
        <article className="border p-4 rounded-md border-gray-300">
          <p className="font-medium whitespace-pre-wrap">{item.tarefa}</p>
        </article>

        <form className="mt-5 md:mt-10">
          <h1 className="font-bold text-xl md:text-3xl mb-2">
            Deixar Comentário
          </h1>

          <TextArea
            placeholder="Digite seu Comentário"
            className="border p-4 rounded-md border-gray-300 resize-none w-full outline-none h-32 whitespace-pre-wrap"
            value={textArea}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setTextArea(e.target.value)
            }
          />

          <button
            className={`w-full bg-blue-500 text-white font-bold rounded-md p-2 mt-2 cursor-pointer text-sm md:text-lg ${
              !session?.user
                ? "disabled:cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
            onClick={handleAddComment}
            disabled={!session?.user}
          >
            Enviar Comentário
          </button>
        </form>

        <section className="mt-8 md:mt-16">
          <h2 className="font-bold text-lg md:text-2xl mb-2">
            Todos os Comentários
          </h2>
          <div className="flex flex-col gap-3">
            {comments.length === 0 && <p>Nenhum comentário encontrado...</p>}

            {comments.map((comment) => (
              <article
                className="border p-4 rounded-md border-gray-300"
                key={comment.id}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="bg-slate-500 text-white py-1 px-2 rounded-full text-xs">
                    {comment.name}
                  </span>

                  {comment.user === session?.user?.email && (
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <FaTrash size={14} className="text-red-500" />
                    </button>
                  )}
                </div>
                <p className="whitespace-pre-wrap">{comment.comment}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const docRef = doc(db, "tarefas", id);
  const snapshot = await getDoc(docRef);

  const q = query(collection(db, "comentarios"), where("taskId", "==", id));
  const snapComments = await getDocs(q);

  const allComments: CommentsProps[] = [];

  snapComments.forEach((doc) => {
    allComments.push({
      id: doc.id,
      comment: doc.data().comment,
      user: doc.data().user,
      name: doc.data().name,
      taskId: doc.data().taskId,
    });
  });

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const milliSeconds = snapshot.data()?.created * 100;
  const task = {
    tarefa: snapshot.data()?.tarefa,
    public: snapshot.data()?.public,
    created: new Date(milliSeconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: id,
  };

  return {
    props: {
      item: task,
      allComments: allComments,
    },
  };
};
