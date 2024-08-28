import UserInfo from "../section-chat-list/UserInfo";
import userProfile from "../../assets/users-profiles/my-profile.jpeg";
import { ComponentPropsWithoutRef } from "react";
import { Image, Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import MessageCard from "./MessageCard";

const MESSAGES = [
   {
      msgID: "12en",
      sender: "Lety",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam cupiditate sequi officia libero odit qui dolor soluta molestias, minima tenetur quos nihil?",
      sendAt: "today: 12:06",
   },
   {
      msgID: "13en",
      sender: "Dinoh",
      text: "Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam?",
      sendAt: "today: 12:09",
   },
   {
      msgID: "12en",
      sender: "Lety",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam cupiditate sequi officia libero odit qui dolor soluta molestias, minima tenetur quos nihil?",
      sendAt: "today: 12:06",
   },
   {
      msgID: "13en",
      sender: "Dinoh",
      text: "Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam?",
      sendAt: "today: 12:09",
   },
   {
      msgID: "12en",
      sender: "Lety",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam cupiditate sequi officia libero odit qui dolor soluta molestias, minima tenetur quos nihil?",
      sendAt: "today: 12:06",
   },
   {
      msgID: "13en",
      sender: "Dinoh",
      text: "Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam?",
      sendAt: "today: 12:09",
   },
   {
      msgID: "12en",
      sender: "Lety",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam cupiditate sequi officia libero odit qui dolor soluta molestias, minima tenetur quos nihil?",
      sendAt: "today: 12:06",
   },
   {
      msgID: "13en",
      sender: "Dinoh",
      text: "Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam?",
      sendAt: "today: 12:09",
   },
   {
      msgID: "12en",
      sender: "Lety",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam cupiditate sequi officia libero odit qui dolor soluta molestias, minima tenetur quos nihil?",
      sendAt: "today: 12:06",
   },
   {
      msgID: "13en",
      sender: "Dinoh",
      text: "Omnis ab vel harum cumque quo. Perspiciatis modi quibusdam?",
      sendAt: "today: 12:09",
   },
];

export default function ChatDetails(props: ComponentPropsWithoutRef<"div">) {
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
                     {...msg}
                     variant={msg.sender === "Dinoh" ? "own" : "friend"}
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
