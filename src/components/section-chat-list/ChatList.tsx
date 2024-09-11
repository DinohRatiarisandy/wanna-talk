import { ComponentPropsWithoutRef, useEffect, useState } from "react";

import { Ellipsis, X } from "lucide-react";

import { database } from "@/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useThemeStore } from "@/store/useThemeStore";
import { usePanelStore } from "@/store/usePanelStore";
import { doc, getDoc, onSnapshot, Timestamp } from "firebase/firestore";

import NewChat from "./NewChat";
import ChatCard from "./ChatCard";
import { Button } from "../ui/button";
import Logout from "../connexion/Logout";
import { UserFirebase } from "../models/types";
import { ToggleTheme } from "../ui/ToggleTheme";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type ChatListProps = ComponentPropsWithoutRef<"div">;
export type ChatType = {
   chatId?: string;
   receiverId: string;
   lastMessage: string;
   user: UserFirebase;
   updatedAt: Timestamp;
   isSeen: boolean;
};

export default function ChatList(props: ChatListProps) {
   const [userChatList, setUserChatList] = useState<ChatType[]>([]);
   const { theme, toggleTheme } = useThemeStore();
   const { leftPanel, setLeftPanel } = usePanelStore();
   const user = useAuthStore((state) => state.user);
   const chatId = useChatStore((state) => state.chatId);

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
                     chatData.sort((a, b) => b.updatedAt - a.updatedAt),
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
            <div className="flex gap-2">
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

               {leftPanel && !chatId && (
                  <Button variant="outline" className="h-full p-0 md:hidden">
                     <X
                        onClick={() => setLeftPanel(false)}
                        className="cursor-pointer"
                     />
                  </Button>
               )}
            </div>
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
               const isActive = chat.chatId === chatId;
               if (chat.lastMessage === "") return;
               return (
                  <ChatCard
                     className={`${isActive ? "bg-secondary" : ""}`}
                     key={chat.chatId}
                     chat={chat}
                     lastMessage={chat.lastMessage}
                     userChatList={userChatList}
                     {...chat.user}
                  />
               );
            })}
         </main>
      </div>
   );
}
