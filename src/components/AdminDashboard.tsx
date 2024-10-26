import { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminAppointment from "./AdminAppointment";
import AdminEmployee from "./AdminEmployee";
import AdminProduct from "./AdminProduct";

export default function AdminDashboard() {
  // state to set the content
  const [content, setContent] = useState("employee");

  /**
   * change the window content
   * @param contentName the name of the content to display
   */
  const toggleContent = (contentName: string) => {
    setContent(contentName);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader toggleContent={toggleContent} content={content} />
      {content === "employee" && <AdminEmployee />}
      {content === "product" && <AdminProduct />}
      {content === "appointment" && <AdminAppointment />}
    </div>
  );
}
