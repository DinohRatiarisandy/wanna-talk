import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ChatDetails from "./section-chat-details/ChatDetails";
import ChatList from "./section-chat-list/ChatList";
import ChatMedia from "./section-media-shared/ChatMedia";
import Login from "./connexion/Login";

export default function AppContent() {
   const user = useContext(AuthContext);
   console.log(user)

   return user !== null ? (
      <div className="flex">
         <ChatList className="flex h-[100vh] flex-[1] flex-col gap-2 border-r border-accent" />
         <ChatDetails className="flex h-[100vh] flex-[2.5] flex-col border-accent lg:border-r" />
         <ChatMedia className="hidden h-[100vh] flex-[1] flex-col lg:flex" />
      </div>
   ) : (
      <Login />
   );
}
