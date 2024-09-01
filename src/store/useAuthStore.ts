import { create } from "zustand";
import { UserFirebase } from "@/components/models/types";
import { doc, getDoc } from "firebase/firestore";
import { database } from "@/firebase";

type AuthState = {
   user: UserFirebase | undefined | null;
   isLoading: boolean;
   setUser: (user: UserFirebase | undefined | null) => void;
   fetchUserInfo: (uid: string) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
   user: null,
   isLoading: true,
   setUser: (user) => set({ user, isLoading: false }),
   fetchUserInfo: async (uid: string) => {
      if (!uid) {
         set({ user: null, isLoading: false });
         return;
      }
      try {
         const docRef = doc(database, "users", uid);
         const docSnap = await getDoc(docRef);

         if (docSnap.exists()) {
            set({ user: docSnap.data() as UserFirebase, isLoading: false });
         } else {
            set({ user: null, isLoading: false });
         }
      } catch (error) {
         set({ user: null, isLoading: false });
      }
   },
}));
