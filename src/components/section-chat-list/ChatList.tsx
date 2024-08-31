import { Ellipsis } from "lucide-react";
import ChatCard from "./ChatCard";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { ToggleTheme } from "../ui/ToggleTheme";
import {
   DropdownMenuItem,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useThemeStore } from "@/store/useThemeStore";
import Logout from "../connexion/Logout";
import { useAuthStore } from "@/store/useAuthStore";
import { doc, getDoc, onSnapshot, Timestamp } from "firebase/firestore";
import { database } from "@/firebase";
import { UserInfos } from "../models/types";
import NewChat from "./NewChat";

type ChatListProps = ComponentPropsWithoutRef<"div">;
export type ChatType = {
   chatId?: string;
   receiverId: string;
   lastMessage: string;
   user: UserInfos;
   updateAt: Timestamp;
};

export default function ChatList(props: ChatListProps) {
   const { theme, toggleTheme } = useThemeStore();
   const user = useAuthStore((state) => state.user);
   const [userChatList, setUserChatList] = useState<ChatType[]>([]);

   useEffect(() => {
      if (user?.userID) {
         const unsubscribe = onSnapshot(
            doc(database, "userChatList", user.userID),
            async (res) => {
               if (res.exists()) {
                  const items = res.data().chats;

                  const promises = items.map(async (item: ChatType) => {
                     const userDocRef = doc(database, "users", item.receiverId);
                     const userDocSnap = await getDoc(userDocRef);

                     const user = userDocSnap.data();
                     return { ...item, user };
                  });

                  const chatData = await Promise.all(promises);
                  setUserChatList(
                     chatData.sort((a, b) => b.updateAt - a.updateAt),
                  );
               } else {
                  console.log("No such document!");
               }
            },
            (error) => {
               console.log("Error fetching user chat list:", error);
            },
         );

         return () => unsubscribe();
      }
   }, [user?.userID]);
   console.log(userChatList);
   return (
      <div className={props.className}>
         {/**
          *
          * Section 1: header
          * (Write new message and option for logout and change mode)
          *
          **/}
         <header className="mb-3 flex items-center justify-between p-2">
            {/* New message */}
            <NewChat />

            {/* Logout and toggle mode */}
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Ellipsis className="cursor-pointer" />
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-42 z-40 rounded">
                  <DropdownMenuItem
                     onClick={toggleTheme}
                     className="flex cursor-pointer gap-1"
                  >
                     <ToggleTheme size={18} />
                     <span>
                        {theme === "dark" ? "Light mode" : "Dark mode"}
                     </span>
                  </DropdownMenuItem>
                  <Logout />
               </DropdownMenuContent>
            </DropdownMenu>
         </header>

         {/**
          *
          * Label for Discussions
          *
          */}
         <p className="text-center text-xl">Discussions</p>

         {/**
          *
          * Section 1: main (All the user's chat)
          *
          **/}
         <main className="overflow-scroll">
            {userChatList.map(function (chat) {
               return (
                  <ChatCard
                     key={chat.chatId}
                     lastMessage={chat.lastMessage}
                     {...chat.user}
                  />
               );
            })}
         </main>
      </div>
   );
}
