import UserInfo from "../section-chat-list/UserInfo";
import { ComponentPropsWithoutRef } from "react";
import { Image, Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import MessageCard from "./MessageCard";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import {
   arrayUnion,
   doc,
   DocumentData,
   getDoc,
   updateDoc,
} from "firebase/firestore";
import { database } from "@/firebase";

type ChatDetailsProps = ComponentPropsWithoutRef<"div">;

export default function ChatDetails(props: ChatDetailsProps) {
   const { user } = useAuthStore();
   const { messages, chatId, user: friend } = useChatStore();

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const form = e.currentTarget;
      const messageArea = form.elements.namedItem(
         "message-area",
      ) as HTMLInputElement;

      if (!messageArea.value.trim()) return;
      if (!chatId || !user?.userID || !friend?.userID) return;

      const messageText = messageArea.value;
      messageArea.value = "";

      try {
         await updateDoc(doc(database, "chats", chatId), {
            messages: arrayUnion({
               senderId: user.userID,
               text: messageText,
               sendAt: new Date(),
            }),
         });

         messageArea.value = "";
         const users = [user.userID, friend.userID];

         users.forEach(async (id: string) => {
            const userChatsRef = doc(database, "userChatList", id);
            const userChatsSnapshot = await getDoc(userChatsRef);
            if (userChatsSnapshot.exists()) {
               const userChatsData = userChatsSnapshot.data();

               const chatIndex = userChatsData.chats.findIndex(
                  (c: DocumentData) => c.chatId === chatId,
               );
               userChatsData.chats[chatIndex].lastMessage = messageText;
               userChatsData.chats[chatIndex].isSeen =
                  id === user.userID ? true : false;
               userChatsData.chats[chatIndex].updatedAt = Date.now();

               await updateDoc(userChatsRef, {
                  chats: userChatsData.chats,
               });
            }
         });
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className={props.className}>
         {/**
          *
          * Header: Show with who the user chat
          *
          */}
         <header className="flex border-b border-accent text-xl">
            <UserInfo
               userProfil={friend?.userProfil}
               userName={friend?.userName}
               className="flex w-full gap-2"
            />
         </header>

         {/**
          *
          * Main: Show conversation
          *
          */}
         <main className="flex flex-1 flex-col gap-4 overflow-scroll p-2">
            {messages &&
               messages.messages.map(function (msg: DocumentData) {
                  return (
                     <MessageCard
                        text={msg.text}
                        senderId={msg.senderId}
                        sendAt={new Date()}
                        key={msg.sendAt}
                        variant={
                           msg.senderId === user?.userID ? "own" : "friend"
                        }
                        {...msg}
                     />
                  );
               })}
         </main>

         {/**
          *
          * Input for sending message
          *
          */}
         <form onSubmit={handleSubmit} className="flex items-end gap-2 p-2">
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger>
                     <Image className="cursor-pointer transition-all hover:text-primary dark:hover:text-primary" />
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Upload image</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>

            <Textarea id="message-area" placeholder="Tap your message..." />

            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger>
                     <Send className="cursor-pointer transition-all hover:text-primary dark:hover:text-primary" />
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Send</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </form>
      </div>
   );
}
