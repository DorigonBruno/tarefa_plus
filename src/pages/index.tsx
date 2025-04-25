import { GetStaticProps } from "next";
import Image from "next/image";
import logo from "../../public/assets/hero.png";
import Head from "next/head";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

type HomeProps = {
  posts: number;
  comments: number;
};

export default function Home({ posts, comments }: HomeProps) {
  return (
    <div className="bg-black">
      <Head>
        <title>Tarefas Plus</title>
      </Head>
      <main className="w-full h-screen overflow-hidden max-w-6xl m-auto p-1 flex flex-col justify-center items-center md:gap-2 text-white">
        <Image
          src={logo}
          alt="logo do tarefa plus"
          className="block w-full max-w-xs md:max-w-xl object-cover"
          priority
        />

        <h1 className="font-bold text-xl md:text-4xl max-w-2xl text-center my-10">
          Sistema feito para você organizar seus estudos e terefas
        </h1>

        <div className="w-full flex flex-col md:flex-row md:justify-center gap-2 md:gap-20">
          <button
            className="bg-foreground text-black rounded-lg
           py-2 px-8 hover:scale-110 transition-all ease-in-out font-medium"
          >
            +{posts} posts
          </button>
          <button className="bg-foreground text-black rounded-lg py-2 px-8 hover:scale-110 transition-all ease-in-out font-medium">
            +{comments} comentários
          </button>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const commentRef = collection(db, "comentarios");
  const commentSnapshot = await getDocs(commentRef);

  const postRef = collection(db, "tarefas");
  const postSnapshot = await getDocs(postRef);

  return {
    props: {
      posts: postSnapshot.size || 0,
      comments: commentSnapshot.size || 0,
    },
    revalidate: 60,
  };
};
