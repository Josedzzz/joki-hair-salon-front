import { useState } from "react";
import LoginHeader from "./LoginHeader";
import LoginCard from "./LoginCard";
import SignupCard from "./SignupCard";
import AboutCard from "./AboutCard";

export default function LoginDashboard() {
  // use state to set the card to display on the login dashboard
  const [card, setCard] = useState<string>("login");

  /**
   * change the window content based on the card name
   * @param cardName the name of the car to display
   */
  const toggleCard = (cardName: string) => {
    setCard(cardName);
  };

  return (
    <div className="min-h-screen bg-custom-black flex flex-col">
      <LoginHeader toggleCard={toggleCard} card={card} />
      {card === "login" && <LoginCard />}
      {card === "singup" && <SignupCard />}
      {card === "aboutus" && <AboutCard />}
    </div>
  );
}
