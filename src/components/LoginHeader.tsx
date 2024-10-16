import { useState } from "react";

// define the type for the header props
type LoginHeaderProps = {
  toggleCard: (cardName: string) => void;
  card: string;
};

export default function LoginHeader({ toggleCard, card }: LoginHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * depends on the link selected give to the element diferent styles
   * @param link the selected cardName
   * @returns the tailwind classes to be added
   */
  const linkClasses = (link: string) =>
    `hover:text-custom-silver text-sm sm:text-md md:text-lg transition duration-300 ease-in-out font-bold ${
      card === link
        ? "border-b-2 border-custom-silver text-custom-silver"
        : "text-custom-dark hover:text-custom-silver text-sm sm:text-md md:text-lg"
    }`;

  return (
    <header className="mt-3 h-12 w-full flex justify-between items-center max-w-3xl mx-auto p-2">
      <div className="flex items-center space-x-1 gap-3">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-custom-dark">
          Joki Hair Salon
        </h1>
        <i className="fa-solid fa-scissors text-xl sm:text-3xl md:text-4xl text-custom-silver"></i>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="block sm:hidden text-custom-dark focus:outline-none"
      >
        <i className="fa-solid fa-bars text-2xl"></i>
      </button>

      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } sm:flex space-x-4 sm:space-x-8 absolute sm:relative top-16 sm:top-auto left-0 w-full sm:w-auto bg-custom-platinum sm:bg-transparent p-4 sm:p-0`}
      >
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
