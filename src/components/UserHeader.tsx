import { useNavigate } from "react-router-dom";

// define a type for the props
type UserHeaderProps = {
  toggleContent: (contentName: string) => void;
  content: string;
};

export default function UserHeader({
  toggleContent,
  content,
}: UserHeaderProps) {
  const navigate = useNavigate();

  /**
   * depends on the link selected give to the element diferent styles
   * @param link the selected cardName
   * @returns the tailwind classes to be added
   */
  const linkClasses = (link: string) =>
    `hover:text-custom-silver hover:scale-105 text-sm sm:text-md md:text-lg transition duration-300 ease-in-out font-bold ${
      content === link
        ? "border-b-2 border-custom-silver text-custom-silver"
        : "text-custom-dark hover:text-custom-silver text-sm sm:text-md md:text-lg"
    }`;

  return (
    <header className="h-16 w-full bg-custom-white flex justify-between items-center p-2 sm:px-14">
      <div className="flex items-center space-x-1 gap-3">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-custom-dark">
          Joki Hair Salon
        </h1>
        <i className="fa-solid fa-scissors text-xl sm:text-3xl md:text-4xl text-custom-silver"></i>
      </div>

      <nav className="sm:flex space-x-4 sm:space-x-8 absolute sm:relative top-16 sm:top-auto left-0 w-full sm:w-auto bg-custom-white sm:bg-transparent p-4 sm:p-0">
        <a
          onClick={() => toggleContent("appointment")}
          className={linkClasses("appointment")}
        >
          Appointment
        </a>
        <a
          onClick={() => toggleContent("history")}
          className={linkClasses("history")}
        >
          History
        </a>
        <a
          onClick={() => toggleContent("products")}
          className={linkClasses("products")}
        >
          Products
        </a>
        <a
          onClick={() => toggleContent("team")}
          className={linkClasses("team")}
        >
          Our team
        </a>
        <a
          onClick={() => toggleContent("cart")}
          className={linkClasses("cart")}
        >
          Cart
        </a>
        <a
          onClick={() => navigate("/login")}
          className={linkClasses("log-out")}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </a>
      </nav>
    </header>
  );
}
