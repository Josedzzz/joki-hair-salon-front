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
   * depends on the link selected give to the element different styles
   * @param link the selected content name
   * @returns the tailwind classes to be added
   */
  const linkClasses = (link: string) =>
    `hover:text-custom-silver hover:scale-105 text-sm sm:text-md md:text-lg transition duration-300 ease-in-out font-bold ${
      content === link
        ? "border-b-2 border-custom-silver text-custom-silver"
        : "text-custom-dark hover:text-custom-silver"
    }`;

  return (
    <header className="h-16 w-full bg-custom-white flex justify-between items-center p-2 sm:px-14">
      <div className="flex items-center space-x-1 gap-3">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-custom-dark">
          Hair Salon
        </h1>
        <i className="fa-solid fa-scissors text-xl sm:text-3xl md:text-4xl text-custom-silver"></i>
      </div>

      {/* Navigation Links with Horizontal Scroll on Small Screens */}
      <nav className="flex overflow-x-auto space-x-4 sm:space-x-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300">
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
          Team
        </a>
        <a
          onClick={() => toggleContent("cart")}
          className={linkClasses("cart")}
        >
          Cart
        </a>
        <a
          onClick={() => toggleContent("account")}
          className={linkClasses("account")}
        >
          <i className="fa-regular fa-user"></i>
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
