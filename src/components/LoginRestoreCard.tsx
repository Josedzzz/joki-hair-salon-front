import { useState } from "react";
import {
  recoverPasswordCode,
  sendRecoverPasswordCode,
} from "../services/loginService";

export default function LoginRestoreCard() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [message, setMesssage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle sending verification code
   */
  const handleSendVerificationCode = async () => {
    setIsLoading(true);
    setMesssage("");

    try {
      const response = await sendRecoverPasswordCode({ email: email });
      setMesssage(response.message);
      setIsCodeSent(true); // Show verification code and new password fields
    } catch (error) {
      if (error instanceof Error) {
        setMesssage(error.message);
      } else {
        setMesssage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle password recovery
   */
  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the new password
    if (!validatePassword(newPassword)) {
      setMesssage("Password must be at least 4 characters long.");
      return;
    }

    const credentials = {
      email,
      verificationCode,
      newPassword,
    };

    try {
      const response = await recoverPasswordCode(credentials);
      setMesssage(response.message);
      // reload the page after successfully password update
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        setMesssage(error.message);
      } else {
        setMesssage("An unexpected error occurred.");
      }
    }
  };

  /**
   * Helper function to validate the password (at least 4 characters)
   * @param password the password to be validated
   * @returns
   */
  const validatePassword = (password: string) => {
    return password.length >= 4;
  };

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-2">
      <div className="w-full max-w-md bg-custom-white p-6 shadow-lg rounded-lg bounce-in">
        <h2 className="text-xl font-bold text-custom-dark text-center mb-4">
          Restore Password
        </h2>

        {/* Email and Send Verification Code */}
        {!isCodeSent && (
          <>
            <div className="mb-6">
              <label className="block text-custom-dark mb-2">
                <i className="fa-solid fa-envelope"></i> Email
              </label>
              <input
                className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={handleSendVerificationCode}
              disabled={isLoading}
              className={`text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl w-full ${
                isLoading
                  ? "bg-custom-dark text-custom-white cursor-not-allowed"
                  : "hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
              }`}
            >
              {isLoading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Send Verification Code"
              )}
            </button>
          </>
        )}

        {/* Show this part only after the verification code is sent */}
        {isCodeSent && (
          <form onSubmit={handleRecoverPassword} className="bounce-in">
            <div className="mb-6">
              <label className="block text-custom-dark mb-2">
                <i className="fa-solid fa-key"></i> Verification Code
              </label>
              <input
                className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
                type="text"
                placeholder="Enter your verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-custom-dark mb-2" htmlFor="password">
                <i className="fa-solid fa-lock"></i> New Password
              </label>
              <input
                className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
                type="password"
                id="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {/* Button to submit the form */}
            <button
              type="submit"
              className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105 w-full"
            >
              Verify
            </button>
          </form>
        )}

        {message && (
          <p className="text-custom-silver text-center mt-4">{message}</p>
        )}
      </div>
    </main>
  );
}
