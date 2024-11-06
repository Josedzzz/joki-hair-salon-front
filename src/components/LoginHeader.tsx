// define the type for the header props
type LoginHeaderProps = {
  toggleCard: (cardName: string) => void;
  card: string;
};

export default function LoginHeader({ toggleCard, card }: LoginHeaderProps) {
  /**
   * depends on the link selected give to the element different styles
   * @param link the selected cardName
   * @returns the tailwind classes to be added
   */
  const linkClasses = (link: string) =>
    `hover:text-custom-silver hover:scale-105 text-sm sm:text-md md:text-lg transition duration-300 ease-in-out font-bold ${
      card === link
        ? "border-b-2 border-custom-silver text-custom-silver"
        : "text-custom-dark hover:text-custom-silver"
    }`;

  return (
    <header className="h-16 w-full bg-custom-white flex justify-between items-center p-2 sm:px-14 fade-in">
      <div className="flex items-center space-x-1 gap-3">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-custom-dark">
          Joki Hair Salon
        </h1>
        <i className="fa-solid fa-scissors text-xl sm:text-3xl md:text-4xl text-custom-silver"></i>
      </div>

      {/* Navigation Links with Horizontal Scroll on Small Screens */}
      <nav className="flex overflow-x-auto space-x-4 sm:space-x-8">
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
