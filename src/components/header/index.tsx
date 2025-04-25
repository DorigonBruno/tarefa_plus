import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full text-white bg-black">
      <div className="flex justify-between items-center p-2 mt-2 md:mt-6 w-full max-w-5xl m-auto">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/">
            <h1 className="text-2xl md:text-4xl flex items-center font-bold">
              Tarefas<span className="mt-1 ml-0.5 text-red-500">+</span>
            </h1>
          </Link>

          {session?.user && (
            <Link href="/dashboard">
              <button className="cursor-pointer bg-white text-black rounded-md py-1 px-2">
                Meu Painel
              </button>
            </Link>
          )}
        </div>

        {status === "loading" ? (
          <button className="border-1 border-white py-1 px-2 text-sm md:text-lg md:py-2 md:px-4 rounded-full cursor-pointer hover:bg-white hover:text-black hover:scale-105 transition-all ease-in-out">
            Minha Conta
          </button>
        ) : session ? (
          <button
            className="border-1 border-white py-1 px-2 text-sm md:text-lg md:py-2 md:px-4 rounded-full cursor-pointer hover:bg-white hover:text-black hover:scale-105 transition-all ease-in-out"
            onClick={() => signOut()}
          >
            Olá {session?.user?.name}
          </button>
        ) : (
          <button
            className="border-1 border-white py-1 px-2 text-sm md:text-lg md:py-2 md:px-4 rounded-full cursor-pointer hover:bg-white hover:text-black hover:scale-105 transition-all ease-in-out"
            onClick={() => signIn("google")}
          >
            Minha Conta
          </button>
        )}
      </div>
    </header>
  );
}
