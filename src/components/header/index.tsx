export default function Header() {
  return (
    <header className="w-full flex items-center justify-between m-auto p-1 max-w-5xl mt-6">
      <h1 className="text-2xl md:text-4xl flex items-center font-bold">
        Tarefas<span className="mt-1 ml-0.5 text-red-500">+</span>
      </h1>

      <button className="border-1 py-1 px-2 text-sm md:text-lg md:py-2 md:px-4 rounded-full cursor-pointer">
        Minha Conta
      </button>
    </header>
  );
}
