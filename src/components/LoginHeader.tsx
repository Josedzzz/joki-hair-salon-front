// define the type for the header props
type LoginHeaderProps = {
  toggleCard: (cardName: string) => void;
  card: string;
};

export default function LoginHeader({ toggleCard, card }: LoginHeaderProps) {
  /**
   * depends on the link selected give to the element diferent styles
   * @param link the selected cardName
   * @returns the tailwind classes to be added
   */
  const linkClasses = (link: string) =>
    `hover:text-blue-400 font-bold text-sm sm:text-md md:text-lg transition duration-300 ease-in-out ${
      card === link
        ? "border-b-2 border-blue-400 text-blue-400"
        : "text-white hover:text-blue-400 font-bold text-sm sm:text-md md:text-lg"
    }`;

  return (
    <header className="mt-3 h-12 w-full flex justify-between items-center max-w-3xl mx-auto p-2">
      <div className="flex items-center space-x-1 gap-3">
        <h1 className="text-xl sm:text-3xl md:text-4xl text-slate-50 font-bold">
          Joki Hair Salon
        </h1>
        <i className="fa-solid fa-scissors text-xl sm:text-3xl md:text-4xl text-blue-400"></i>
      </div>
      <nav className="space-x-4 sm:space-x-8">
        <a
          onClick={() => toggleCard("aboutus")}
          className={linkClasses("aboutus")}
        >
          About us
        </a>
        <a
          onClick={() => toggleCard("singup")}
          className={linkClasses("singup")}
        >
          Sign up
        </a>
        <a onClick={() => toggleCard("login")} className={linkClasses("login")}>
          Login
        </a>
      </nav>
    </header>
  );
}
