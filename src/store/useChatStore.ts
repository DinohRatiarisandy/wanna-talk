import { create } from "zustand";
import { UserFirebase } from "@/components/models/types";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { database } from "@/firebase";

type chatState = {
   chatId: string | undefined;
   user: UserFirebase | null;
   messages: DocumentData | null;
   setChatId: (id: string | undefined) => void;
   changeChat: (chatId: string | undefined, user: UserFirebase | null) => void;
};

export const useChatStore = create<chatState>((set) => ({
   chatId: undefined,
   user: null,
   messages: null,
   setChatId: (id: string | undefined) => set({ chatId: id }),
   changeChat: (chatId: string | undefined, user: UserFirebase | null) => {
      if (!chatId) return;

      set({
         chatId,
         user,
         messages: undefined,
      });

      const unsubscribe = onSnapshot(doc(database, "chats", chatId), (res) => {
         if (res.exists()) {
            set({ messages: res.data() });
         } else {
            console.log("No such document!");
         }
      });

      return () => unsubscribe();
   },
}));
