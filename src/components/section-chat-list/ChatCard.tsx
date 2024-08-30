import UserInfo from "./UserInfo";

type ChatCardProps = {
   chatName: string;
   chatProfile: string;
   chatLastMsg: string;
};

export default function ChatCard(props: ChatCardProps) {
   return (
      <div className="flex cursor-pointer transition-all hover:bg-secondary">
         <UserInfo
            userName={props.chatName}
            userProfile={props.chatProfile}
            className="flex items-center gap-2 lg:text-lg"
         >
            <p className="h-5 w-full overflow-hidden text-sm">
               {props.chatLastMsg}
            </p>
         </UserInfo>
      </div>
   );
}
