import ChatDetails from "./section-chat-details/ChatDetails";
import ChatList from "./section-chat-list/ChatList";
import ChatMedia from "./section-media-shared/ChatMedia";
import Login from "./connexion/Login";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";
import Loading from "./ui/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export default function AppContent() {
   const { user, isLoading, fetchUserInfo, setUser } = useAuthStore();
   const { theme } = useThemeStore();

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
      if (user?.userID) {
         fetchUserInfo(user.userID);
      } else {
         setUser(null);
      }
   }, [user?.userID, fetchUserInfo]);

   useEffect(() => {
      document.documentElement.classList.add(theme);
   }, [theme]);

   console.log(user);
   console.log("Loading ", isLoading);

   if (isLoading) return <Loading />;

   return user ? (
      <div className={`flex ${theme}`}>
         <ChatList className="flex h-[100vh] flex-[1] flex-col gap-2 border-r border-accent" />
         <ChatDetails className="flex h-[100vh] flex-[2.5] flex-col border-accent lg:border-r" />
         <ChatMedia className="hidden h-[100vh] flex-[1] flex-col lg:flex" />
      </div>
   ) : (
      <div className="flex h-[100vh] w-full items-center">
         <Login />
      </div>
   );
}
