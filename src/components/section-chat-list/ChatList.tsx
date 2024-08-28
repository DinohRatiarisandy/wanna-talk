import UserInfo from "./UserInfo";
import userProfile from "../../assets/users-profiles/my-profile.jpeg";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import ChatCard from "./ChatCard";
import { ComponentPropsWithoutRef } from "react";

const CHAT_LIST = [
   {
      chatUID: "12en",
      chatName: "Dinoh S.",
      chatProfile: userProfile,
      chatLastMsg:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia sunt qui quae hic maiores fugiat nostrum quaerat autem illo dignissimos corrupti sed quas blanditiis velit eum aliquid enim animi!",
   },
   {
      chatUID: "124aw",
      chatName: "Prisca L.",
      chatProfile: userProfile,
      chatLastMsg: "Salut ! ❤️",
   },
   {
      chatUID: "12en",
      chatName: "Dinoh S.",
      chatProfile: userProfile,
      chatLastMsg:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia sunt qui quae hic maiores fugiat nostrum quaerat autem illo dignissimos corrupti sed quas blanditiis velit eum aliquid enim animi!",
   },
   {
      chatUID: "124aw",
      chatName: "Prisca L.",
      chatProfile: userProfile,
      chatLastMsg: "Salut ! ❤️",
   },
   {
      chatUID: "12en",
      chatName: "Dinoh S.",
      chatProfile: userProfile,
      chatLastMsg:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia sunt qui quae hic maiores fugiat nostrum quaerat autem illo dignissimos corrupti sed quas blanditiis velit eum aliquid enim animi!",
   },
   {
      chatUID: "124aw",
      chatName: "Prisca L.",
      chatProfile: userProfile,
      chatLastMsg: "Salut ! ❤️",
   },
   {
      chatUID: "12en",
      chatName: "Dinoh S.",
      chatProfile: userProfile,
      chatLastMsg:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia sunt qui quae hic maiores fugiat nostrum quaerat autem illo dignissimos corrupti sed quas blanditiis velit eum aliquid enim animi!",
   },
   {
      chatUID: "124aw",
      chatName: "Prisca L.",
      chatProfile: userProfile,
      chatLastMsg: "Salut ! ❤️",
   },
   {
      chatUID: "12en",
      chatName: "Dinoh S.",
      chatProfile: userProfile,
      chatLastMsg:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia sunt qui quae hic maiores fugiat nostrum quaerat autem illo dignissimos corrupti sed quas blanditiis velit eum aliquid enim animi!",
   },
   {
      chatUID: "124aw",
      chatName: "Prisca L.",
      chatProfile: userProfile,
      chatLastMsg: "Salut ! ❤️",
   },
   {
      chatUID: "12en",
      chatName: "Dinoh S.",
      chatProfile: userProfile,
      chatLastMsg:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia sunt qui quae hic maiores fugiat nostrum quaerat autem illo dignissimos corrupti sed quas blanditiis velit eum aliquid enim animi!",
   },
   {
      chatUID: "124aw",
      chatName: "Prisca L.",
      chatProfile: userProfile,
      chatLastMsg: "Salut ! ❤️",
   },
   {
      chatUID: "12en",
      chatName: "Dinoh S.",
      chatProfile: userProfile,
      chatLastMsg:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia sunt qui quae hic maiores fugiat nostrum quaerat autem illo dignissimos corrupti sed quas blanditiis velit eum aliquid enim animi!",
   },
   {
      chatUID: "124aw",
      chatName: "Prisca L.",
      chatProfile: userProfile,
      chatLastMsg: "Salut ! ❤️",
   },
];
export default function ChatList(props: ComponentPropsWithoutRef<"div">) {
   return (
      <div className={props.className}>
         {/**
          *
          * Section 1: header (USER INFO: Profile and username)
          *
          **/}
         <header className="flex items-center border-b">
            <UserInfo
               userProfile={userProfile}
               userName="Dalma Sandys"
               className="flex items-center gap-2 font-semibold"
            />
         </header>

         {/**
          *
          * Search
          *
          */}
         <div className="flex items-center gap-1.5 px-1.5">
            <Search />
            <Input className="h-6" />
         </div>

         {/**
          *
          * Section 1: main (All the user's chat)
          *
          **/}
         <main className="overflow-scroll">
            {CHAT_LIST.map(function (chat) {
               return <ChatCard key={chat.chatUID} {...chat} />;
            })}
         </main>
      </div>
   );
}
