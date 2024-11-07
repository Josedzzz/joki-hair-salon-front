import { useState } from "react";
import { signUp } from "../services/loginService";
import { useNavigate } from "react-router-dom";

export default function SignupCard() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Helper function to validate the admin username (at least 3 characters)
   * @param username the username to be validate
   * @returns
   */
  const validateUsername = (username: string) => {
    return username.length >= 3;
  };

  /**
   * Helper function to validate the password (at least 4 characters)
   * @param password the password to be validate
   * @returns
   */
  const validatePassword = (password: string) => {
    return password.length >= 4;
  };

  /**
   * Helper function to validate the email format
   * @param email the emial to be validate
   * @returns
   */
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * handles the submission of the signUp event
   * @param e the form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    try {
      // validation before submission
      if (!validateEmail(email)) {
        setMessage("Please enter a valid email address");
        return;
      }
      if (!validateUsername(username)) {
        setMessage("Username must be at least 3 characters long");
        return;
      }
      if (!validatePassword(password)) {
        setMessage("Password must be at least 4 characters long");
        return;
      }

      const response = await signUp({ email, username, password });
      localStorage.setItem("userId", response.data);
      setMessage(response.message);
      navigate("/user-dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-2 slide-in-left">
      <div className="w-full max-w-md bg-custom-white p-8 shadow-lg rounded-lg transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center space-x-1 gap-3 mb-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-custom-dark">
            Sign up
          </h1>
          <i className="fa-solid fa-user text-xl sm:text-3xl md:text-4xl text-custom-silver"></i>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              className="block text-custom-silver font-bold mb-1 text-sm"
              htmlFor="email"
            >
              <i className="fa-regular fa-envelope"></i> Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-custom-gray text-custom-dark w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-silver text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-custom-silver font-bold mb-1 text-sm"
              htmlFor="name"
            >
              <i className="fa-solid fa-user"></i> Username
            </label>
            <input
              type="text"
              id="name"
              className="bg-custom-gray text-custom-dark w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-silver text-sm"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-custom-silver font-bold mb-1 text-sm"
              htmlFor="password"
            >
              <i className="fa-solid fa-lock"></i> Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-custom-gray text-custom-dark w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-silver text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl w-full ${
                isLoading
                  ? "bg-custom-dark text-custom-white cursor-not-allowed"
                  : "hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
              }`}
            >
              {isLoading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
        {message && (
          <p className="text-custom-silver text-center mt-4">{message}</p>
        )}
      </div>
    </main>
  );
}
