import { UserFirebase } from "../models/types";
import UserInfo from "./UserInfo";
import { useChatStore } from "@/store/useChatStore";
import { ChatType } from "./ChatList";
import { usePanelStore } from "@/store/usePanelStore";
import { database } from "@/firebase";
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";

type ChatCardProps = UserFirebase & {
   chat: ChatType;
   lastMessage: string;
   className: string;
};

export default function ChatCard({ className, ...props }: ChatCardProps) {
   const { chatId, changeChat } = useChatStore();
   const { setLeftPanel } = usePanelStore();
   const { user } = useAuthStore();

   async function handleSelect(chat: ChatType) {
      if (!user?.userID) return;

      const userChatsRef = doc(database, "userChatList", user?.userID);
      const userChatsSnapshot = await getDoc(userChatsRef);
      if (userChatsSnapshot.exists()) {
         const userChatsData = userChatsSnapshot.data();

         const chatIndex = userChatsData.chats.findIndex(
            (c: DocumentData) => c.chatId === chatId,
         );
         userChatsData.chats[chatIndex].isSeen = true;

         await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
         });
      }

      changeChat(chat.chatId, chat.user);
      setLeftPanel(false);
   }
   console.log(props.chat.isSeen);
   return (
      <div
         onClick={() => handleSelect(props.chat)}
         className={`${className} relative flex cursor-pointer transition-all hover:bg-secondary`}
      >
         <UserInfo
            userName={props.userName}
            userProfil={props.userProfil}
            className={`${props.chat.isSeen === false ? "font-bold" : ""} flex items-center gap-2 lg:text-lg`}
         >
            <p
               className={`${props.chat.isSeen === false ? "font-bold" : ""} h-5 w-full overflow-hidden text-sm text-secondary-foreground`}
            >
               {props.lastMessage}
            </p>
         </UserInfo>
         {props.chat.isSeen === false && (
            <div className="absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-blue-500/50" />
         )}
      </div>
   );
}
