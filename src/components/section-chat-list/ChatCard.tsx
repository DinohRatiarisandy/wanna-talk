import { UserInfos } from "../models/types";
import UserInfo from "./UserInfo";

type ChatCardProps = UserInfos & {
   lastMessage: string;
};

export default function ChatCard(props: ChatCardProps) {
   return (
      <div className="flex cursor-pointer transition-all hover:bg-secondary">
         <UserInfo
            userName={props.userName}
            userProfil={props.userProfil}
            className="flex items-center gap-2 lg:text-lg"
         >
            <p className="h-5 w-full overflow-hidden text-sm">
               {props.lastMessage}
            </p>
         </UserInfo>
      </div>
   );
}
