import UserInfo from "../section-chat-list/UserInfo";
import userProfile from "../../assets/users-profiles/my-profile.jpeg";
import { ComponentPropsWithoutRef } from "react";
import { Image, Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import MessageCard from "./MessageCard";
import chatImg from "../../assets/users-profiles/my-profile.jpeg";
import profile1 from "../../assets/users-profiles/profile-1.jpg";
import profile2 from "../../assets/users-profiles/profile-2.jpg";
import profile3 from "../../assets/users-profiles/profile-3.jpg";

const MESSAGES = [
   {
      msgID: "12en13",
      sender: "Lety",
      content:
         "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam cupiditate sequi officia libero odit qui dolor soluta molestias, minima tenetur quos nihil?",
      sendAt: "today: 12:06",
   },
   {
      msgID: "13ensa",
      sender: "Dinoh",
      content: "Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam?",
      sendAt: "today: 12:09",
   },
   {
      msgID: "12enars",
      sender: "Lety",
      content:
         "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam cupiditate sequi officia libero odit qui dolor soluta molestias, minima tenetur quos nihil?",
      sendAt: "today: 12:06",
   },
   {
      msgID: "13enzx",
      sender: "Dinoh",
      content: "Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam?",
      sendAt: "today: 12:09",
   },
   {
      msgID: "12enhn",
      sender: "Lety",
      content:
         "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam cupiditate sequi officia libero odit qui dolor soluta molestias, minima tenetur quos nihil?",
      sendAt: "today: 12:06",
   },
   {
      msgID: "13en213r",
      sender: "Dinoh",
      content: "Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam?",
      sendAt: "today: 12:09",
   },
   {
      msgID: "12en567t",
      sender: "Lety",
      content:
         "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam cupiditate sequi officia libero odit qui dolor soluta molestias, minima tenetur quos nihil?",
      sendAt: "today: 12:06",
   },
   {
      msgID: "13en12s",
      sender: "Dinoh",
      content: "Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam?",
      sendAt: "today: 12:09",
   },
   {
      msgID: "12enllu[",
      sender: "Lety",
      content:
         "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam cupiditate sequi officia libero odit qui dolor soluta molestias, minima tenetur quos nihil?",
      sendAt: "today: 12:06",
   },
   {
      msgID: "13en][",
      sender: "Dinoh",
      isContentImg: true,
      content: chatImg,
      sendAt: "today: 12:09",
   },
   {
      msgID: "13e.n",
      sender: "Lety",
      isContentImg: true,
      content: profile1,
      sendAt: "today: 12:09",
   },
   {
      msgID: "13en/.",
      sender: "Lety",
      isContentImg: true,
      content: profile2,
      sendAt: "today: 12:09",
   },
   {
      msgID: "13easn/.",
      sender: "Dinoh",
      isContentImg: true,
      content: profile3,
      sendAt: "today: 12:09",
   },
];

type ChatDetailsProps = ComponentPropsWithoutRef<"div">;

export default function ChatDetails(props: ChatDetailsProps) {
   return (
      <div className={props.className}>
         {/**
          * Header: Show with who the user chat
          *
          */}
         <header className="flex w-full border-b">
            <UserInfo
               userProfile={userProfile}
               userName="Prisca L."
               className="flex items-center gap-2"
            />
         </header>

         {/**
          *
          * Main: Show conversation
          *
          */}
         <main className="flex flex-1 flex-col gap-4 overflow-scroll p-2">
            {MESSAGES.map(function (msg) {
               return (
                  <MessageCard
                     key={msg.msgID}
                     variant={msg.sender === "Dinoh" ? "own" : "friend"}
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
         <form className="flex items-end gap-2 border-t p-2">
            <Image className="cursor-pointer" />
            <Textarea placeholder="Tap your message..." />
            <Send className="cursor-pointer" />
         </form>
      </div>
   );
}
