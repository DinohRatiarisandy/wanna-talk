import UserInfo from "./UserInfo";

type ChatCardProps = {
   chatName: string;
   chatProfile: string;
   chatLastMsg: string;
};

export default function ChatCard(props: ChatCardProps) {
   return (
      <div className="flex cursor-pointer hover:bg-secondary">
         <UserInfo
            userName={props.chatName}
            userProfile={props.chatProfile}
            className="flex items-center gap-2"
         >
            <p className="h-4 w-full overflow-hidden">{props.chatLastMsg}</p>
         </UserInfo>
      </div>
   );
}
