import { useState } from "react";
import UserHeader from "./UserHeader";
import UserHome from "./UserHome";
import UserAppointment from "./UserAppointment";

export default function UserDashboard() {
  // state to set the content
  const [content, setContent] = useState("home");

  /**
   * change the window content
   * @param contentName the name of the content to display
   */
  const toggleContent = (contentName: string) => {
    setContent(contentName);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader toggleContent={toggleContent} content={content} />
      {content === "home" && <UserHome />}
      {content === "appointment" && <UserAppointment />}
    </div>
  );
}
