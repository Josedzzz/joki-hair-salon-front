import { useEffect, useState } from "react";
import {
  deleteAccount,
  getAccountInfo,
  updateAccount,
} from "../services/clientAccountService";

export default function UserAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
   * Helper function to validate the admin username (at least 3 characters)
   * @param username the username to be validate
   * @returns
   */
  const validateUsername = (username: string) => {
    return username.length >= 3;
  };

  /**
   * Gets the client information
   * @returns
   */
  const handleGetAccount = async () => {
    setMessage("");
    try {
      const clientId = localStorage.getItem("clientId");
      if (!clientId) {
        setMessage("The client doesn't have an ID.");
        return;
      }
      const response = await getAccountInfo(clientId);
      setUsername(response.data.username);
      setEmail(response.data.email);
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while getting the account information.");
    }
  };

  /**
   * Updates the client account
   * @returns
   */
  const handleUpdateAccount = async () => {
    setMessage("");
    try {
      const clientId = localStorage.getItem("clientId");
      if (!clientId) {
        setMessage("The client doesn't have an ID.");
        return;
      }
      // validation before submission
      if (!validateEmail(email)) {
        setMessage("Please enter a valid email address");
        return;
      }
      if (!validateUsername(username)) {
        setMessage("Username must be at least 3 characters long");
        return;
      }
      const response = await updateAccount(clientId, {
        fullName: "",
        phoneNumber: "",
        email,
        username,
      });
      setMessage(response.message || "Account updated successfully.");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  /**
   * Deletes the client account
   * @returns
   */
  const handleDeleteAccount = async () => {
    setMessage("");
    try {
      const clientId = localStorage.getItem("clientId");
      if (!clientId) {
        setMessage("The client doesn't have an ID.");
        return;
      }
      const response = await deleteAccount(clientId);
      setMessage(response.message || "Account deleted successfully.");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    handleGetAccount();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-custom-white p-6 slide-in-left">
      <div className="w-full max-w-lg bounce-in">
        <h1 className="text-2xl font-bold text-custom-dark mb-6 text-center">
          Account Information
        </h1>

        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-custom-white text-custom-dark px-3 py-2 border-2 border-custom-dark rounded-lg w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-custom-white text-custom-dark px-3 py-2 border-2 border-custom-dark rounded-lg w-full"
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleUpdateAccount}
            className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
          >
            Update Account
          </button>
          <button
            onClick={handleDeleteAccount}
            className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
          >
            Delete Account
          </button>
        </div>

        {message && (
          <p className="text-custom-silver text-center mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}
