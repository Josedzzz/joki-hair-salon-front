import { useState } from "react";
import UserHeader from "./UserHeader";
import UserAppointment from "./UserAppointment";
import UserHistory from "./UserHistory";
import UserProducts from "./UserProducts";
import UserTeam from "./UserTeam";
import UserCart from "./UserCart";
import UserAccount from "./UserAccount";

export default function UserDashboard() {
  // state to set the content
  const [content, setContent] = useState("appointment");

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
      {content === "appointment" && <UserAppointment />}
      {content === "history" && <UserHistory />}
      {content === "products" && <UserProducts />}
      {content === "team" && <UserTeam />}
      {content === "cart" && <UserCart />}
      {content === "account" && <UserAccount />}
    </div>
  );
}
