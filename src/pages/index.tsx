import Image from "next/image";
import logo from "../../public/assets/hero.png";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tarefas Plus</title>
      </Head>
      <main className="w-full h-screen overflow-hidden max-w-6xl m-auto p-1 flex flex-col justify-center items-center md:gap-2">
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
           py-2 px-8"
          >
            +7 mil posts
          </button>
          <button className="bg-foreground text-black rounded-lg py-2 px-8">
            + 1 mil comentários
          </button>
        </div>
      </main>
    </>
  );
}
