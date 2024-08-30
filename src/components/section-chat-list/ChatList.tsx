import userProfile from "../../assets/users-profiles/my-profile.jpeg";
import { Input } from "../ui/input";
import { Ellipsis, LogOut, Search, UserRoundPen } from "lucide-react";
import ChatCard from "./ChatCard";
import { ComponentPropsWithoutRef } from "react";
import { ToggleTheme } from "../utils/ToggleTheme";
import {
   DropdownMenuItem,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "../utils/theme-provider";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "../ui/tooltip";

const CHAT_LIST = [
   {
      chatUID: "12en2",
      chatName: "Dinoh S.",
      chatProfile: userProfile,
      chatLastMsg:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia sunt qui quae hic maiores fugiat nostrum quaerat autem illo dignissimos corrupti sed quas blanditiis velit eum aliquid enim animi!",
   },
   {
      chatUID: "124arw",
      chatName: "Prisca L.",
      chatProfile: userProfile,
      chatLastMsg: "Salut ! ❤️",
   },
   {
      chatUID: "12en4",
      chatName: "Dinoh S.",
      chatProfile: userProfile,
      chatLastMsg:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia sunt qui quae hic maiores fugiat nostrum quaerat autem illo dignissimos corrupti sed quas blanditiis velit eum aliquid enim animi!",
   },
   {
      chatUID: "12cv4aw",
      chatName: "Prisca L.",
      chatProfile: userProfile,
      chatLastMsg: "Salut ! ❤️",
   },
   {
      chatUID: "12352en",
      chatName: "Dinoh S.",
      chatProfile: userProfile,
      chatLastMsg:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia sunt qui quae hic maiores fugiat nostrum quaerat autem illo dignissimos corrupti sed quas blanditiis velit eum aliquid enim animi!",
   },
   {
      chatUID: "23st",
      chatName: "Prisca L.",
      chatProfile: userProfile,
      chatLastMsg: "Salut ! ❤️",
   },
   {
      chatUID: "12,.en",
      chatName: "Dinoh S.",
      chatProfile: userProfile,
      chatLastMsg:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia sunt qui quae hic maiores fugiat nostrum quaerat autem illo dignissimos corrupti sed quas blanditiis velit eum aliquid enim animi!",
   },
   {
      chatUID: "124araw",
      chatName: "Prisca L.",
      chatProfile: userProfile,
      chatLastMsg: "Salut ! ❤️",
   },
   {
      chatUID: "12e/.n",
      chatName: "Dinoh S.",
      chatProfile: userProfile,
      chatLastMsg:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia sunt qui quae hic maiores fugiat nostrum quaerat autem illo dignissimos corrupti sed quas blanditiis velit eum aliquid enim animi!",
   },
   {
      chatUID: "12bk4aw",
      chatName: "Prisca L.",
      chatProfile: userProfile,
      chatLastMsg: "Salut ! ❤️",
   },
   {
      chatUID: "12][en",
      chatName: "Dinoh S.",
      chatProfile: userProfile,
      chatLastMsg:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, officia sunt qui quae hic maiores fugiat nostrum quaerat autem illo dignissimos corrupti sed quas blanditiis velit eum aliquid enim animi!",
   },
   {
      chatUID: "oe];;",
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
      chatUID: "'124aw",
      chatName: "Prisca L.",
      chatProfile: userProfile,
      chatLastMsg: "Salut ! ❤️",
   },
];

type ChatListProps = ComponentPropsWithoutRef<"div">;

export default function ChatList(props: ChatListProps) {
   const { theme, setTheme } = useTheme();

   function toggleTheme() {
      setTheme(theme === "dark" ? "light" : "dark");
   }
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
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <UserRoundPen size={24} className="cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>New chat</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>

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
                  <DropdownMenuItem className="flex cursor-pointer gap-1">
                     <LogOut size={18} />
                     <span>Logout</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </header>

         {/**
          *
          * Search
          *
          */}
         <div className="flex items-center gap-1.5 px-1.5 sm:mt-0">
            <Search />
            <Input
               className="h-6 sm:h-8 lg:h-10"
               placeholder="Search user..."
            />
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
