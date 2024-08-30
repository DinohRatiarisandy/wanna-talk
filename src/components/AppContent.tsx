import ChatDetails from "./section-chat-details/ChatDetails";
import ChatList from "./section-chat-list/ChatList";
import ChatMedia from "./section-media-shared/ChatMedia";
import Login from "./connexion/Login";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";
import Loading from "./ui/Loading";

export default function AppContent() {
   const { user, isLoading } = useAuthStore();
   const { theme } = useThemeStore();

   useEffect(() => {
      document.documentElement.classList.add(theme);
   }, [theme]);

   if (isLoading) return <Loading />;

   return user !== null ? (
      <div className={`flex ${theme}`}>
         <ChatList className="flex h-[100vh] flex-[1] flex-col gap-2 border-r border-accent" />
         <ChatDetails className="flex h-[100vh] flex-[2.5] flex-col border-accent lg:border-r" />
         <ChatMedia className="hidden h-[100vh] flex-[1] flex-col lg:flex" />
      </div>
   ) : (
      <Login />
   );
}
