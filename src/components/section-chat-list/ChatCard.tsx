import { UserFirebase } from "../models/types";
import UserInfo from "./UserInfo";
import { useChatStore } from "@/store/useChatStore";
import { ChatType } from "./ChatList";
import { usePanelStore } from "@/store/usePanelStore";
import { database } from "@/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { doc, updateDoc } from "firebase/firestore";

type ChatCardProps = UserFirebase & {
   chat: ChatType;
   lastMessage: string;
   className: string;
   userChatList: ChatType[];
};

export default function ChatCard({
   className,
   userChatList,
   ...props
}: ChatCardProps) {
   const { changeChat } = useChatStore();
   const { setLeftPanel } = usePanelStore();
   const { user } = useAuthStore();

   async function handleSelect(chat: ChatType) {
      if (!user?.userID) return;

      if (!chat.isSeen) {
         const userChats = userChatList.map((item) => {
            const { user, ...rest } = item;
            return rest;
         });
         const chatIndex = userChats.findIndex(
            (item) => item.chatId === chat.chatId,
         );
         userChatList[chatIndex].isSeen = true;

         const userChatsRef = doc(database, "userChatList", user?.userID);

         try {
            await updateDoc(userChatsRef, {
               chats: userChatList,
            });
         } catch (error) {
            console.log(error);
         }
      }

      changeChat(chat.chatId, chat.user);
      setLeftPanel(false);
   }

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
