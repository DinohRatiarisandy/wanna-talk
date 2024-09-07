import { UserFirebase } from "../models/types";
import UserInfo from "./UserInfo";
import { useChatStore } from "@/store/useChatStore";
import { ChatType } from "./ChatList";

type ChatCardProps = UserFirebase & {
   chat: ChatType;
   lastMessage: string;
   className: string;
};

export default function ChatCard({ className, ...props }: ChatCardProps) {
   const { changeChat } = useChatStore();

   async function handleSelect(chat: ChatType) {
      changeChat(chat.chatId, chat.user);
   }

   return (
      <div
         onClick={() => handleSelect(props.chat)}
         className={`flex cursor-pointer transition-all hover:bg-secondary ${className}`}
      >
         <UserInfo
            userName={props.userName}
            userProfil={props.userProfil}
            className="flex items-center gap-2 lg:text-lg"
         >
            <p className="h-5 w-full overflow-hidden text-sm text-secondary-foreground">
               {props.lastMessage}
            </p>
         </UserInfo>
      </div>
   );
}
