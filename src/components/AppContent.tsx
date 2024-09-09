import ChatDetails from "./section-chat-details/ChatDetails";
import ChatList from "./section-chat-list/ChatList";
import ChatMedia from "./section-media-shared/ChatMedia";
import Login from "./connexion/Login";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useChatStore } from "@/store/useChatStore";
import LoadingSkeleton from "./ui/LoadingSkeleton";
import { List } from "lucide-react";
import { usePanelStore } from "@/store/usePanelStore";

export default function AppContent() {
   const { user, loading, fetchUserInfo, setUser } = useAuthStore();
   const { theme } = useThemeStore();
   const { chatId } = useChatStore();
   const { leftPanel, rightPanel, setLeftPanel } = usePanelStore();

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         if (currentUser?.uid) {
            fetchUserInfo(currentUser.uid);
         } else {
            setUser(null);
         }
      });
      return () => unsubscribe();
   }, [fetchUserInfo]);

   useEffect(() => {
      document.documentElement.classList.add(theme);
   }, [theme]);

   if (loading) return <LoadingSkeleton />;

   return user ? (
      <div className={`flex ${theme}`}>
         <nav>
            {!chatId && !leftPanel && (
               <List
                  onClick={() => setLeftPanel(true)}
                  className="absolute left-2 top-2 cursor-pointer md:hidden"
               />
            )}
         </nav>
         <ChatList
            className={`${leftPanel ? "visible" : "hidden"} h-[100vh] flex-[1] flex-col gap-2 border-r border-accent md:flex`}
         />
         {chatId ? (
            <ChatDetails
               className={`${leftPanel || rightPanel ? "hidden" : "visible flex"} h-[100vh] flex-[2.5] flex-col border-accent md:flex lg:border-r`}
            />
         ) : (
            <div
               className={`${leftPanel ? "hidden" : "visible"} flex h-[100vh] w-full flex-[2.5] items-center justify-center border-accent lg:border-r`}
            >
               <div className="flex flex-col items-center justify-center gap-4">
                  <img
                     className="h-24 w-24 rounded-full object-cover ring ring-primary"
                     src={user.userProfil ? user.userProfil : ""}
                     alt={`${user.userName}'s profil`}
                  />
                  <p className="text-2xl">Welcome {user.userName} !</p>
                  <p className="text-secondary-foreground">
                     Select a conversation to chat !
                  </p>
               </div>
            </div>
         )}
         {rightPanel ? (
            <ChatMedia className="flex h-[100vh] flex-[1] flex-col" />
         ) : (
            <div className="hidden h-[100vh] flex-[1]"></div>
         )}
      </div>
   ) : (
      <div className="flex h-[100vh] w-full items-center">
         <Login />
      </div>
   );
}
