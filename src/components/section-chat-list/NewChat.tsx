import { Search, UserRoundPen } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
   arrayUnion,
   collection,
   doc,
   DocumentData,
   getDoc,
   getDocs,
   query,
   serverTimestamp,
   setDoc,
   updateDoc,
   where,
} from "firebase/firestore";
import { database } from "@/firebase";
import { useState } from "react";
import UserInfo from "./UserInfo";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { ChatType } from "./ChatList";
import { UserFirebase } from "../models/types";
import { usePanelStore } from "@/store/usePanelStore";

export default function NewChat() {
   const [friends, setFriends] = useState<DocumentData | null>(null);
   const user = useAuthStore((state) => state.user);
   const { setChatId, changeChat } = useChatStore();
   const { setLeftPanel } = usePanelStore();

   async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const form = e.currentTarget;
      const usernameInput = form.elements.namedItem(
         "username",
      ) as HTMLInputElement;

      try {
         const userRef = collection(database, "users");
         const q = query(userRef, where("userName", "==", usernameInput.value));
         const querySnapShot = await getDocs(q);

         if (!querySnapShot.empty) {
            setFriends(querySnapShot.docs[0].data());
         }
      } catch (error) {
         console.log(error);
      }
   }

   async function handleAdd() {
      if (!user?.userID || !friends?.userID) return;

      setLeftPanel(false);

      const chatRef = collection(database, "chats");
      const userChatRef = doc(database, "userChatList", user.userID);
      const friendChatRef = doc(database, "userChatList", friends.userID);

      try {
         const userChatListSnapshot = await getDoc(userChatRef);
         const userChats = userChatListSnapshot.data()?.chats || [];

         const existingChat = userChats.find((chat: ChatType) => {
            return chat.receiverId === friends.userID;
         });

         if (existingChat) {
            setChatId(existingChat.chatId);
            changeChat(existingChat.chatId, friends as UserFirebase);
            return;
         }

         const newChatRef = doc(chatRef);
         const newChatId = newChatRef.id;

         await setDoc(newChatRef, {
            createdAt: serverTimestamp(),
            messages: [],
         });

         await updateDoc(friendChatRef, {
            chats: arrayUnion({
               chatId: newChatId,
               lastMessage: "",
               receiverId: user.userID,
               updatedAt: Date.now(),
            }),
         });

         await updateDoc(userChatRef, {
            chats: arrayUnion({
               chatId: newChatId,
               lastMessage: "",
               receiverId: friends.userID,
               updatedAt: Date.now(),
            }),
         });

         setChatId(newChatId);
         changeChat(newChatId, friends as UserFirebase);
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <Popover>
         <PopoverTrigger asChild>
            <UserRoundPen size={24} className="cursor-pointer" />
         </PopoverTrigger>
         <PopoverContent className="ml-2 flex w-80 flex-col gap-4 p-2">
            <form
               onSubmit={handleSearch}
               className="flex items-center rounded border p-1"
            >
               <Search size={24} className="text-muted-foreground" />
               <Input
                  id="username"
                  type="text"
                  placeholder="Search user"
                  className="h-8 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
               />
            </form>

            {/*
             * Results
             */}
            <div className="flex flex-col">
               {Boolean(friends) && (
                  <div className="flex items-center justify-between">
                     <UserInfo
                        key={friends?.userID}
                        userName={friends?.userName}
                        userProfil={friends?.userProfil}
                        className="flex items-center gap-2"
                     />
                     <Button onClick={handleAdd} variant="outline">
                        Add
                     </Button>
                  </div>
               )}
            </div>
         </PopoverContent>
      </Popover>
   );
}
