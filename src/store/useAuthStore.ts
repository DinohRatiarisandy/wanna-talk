import { create } from "zustand";
import { UserFirebase } from "@/components/models/types";
import { doc, getDoc } from "firebase/firestore";
import { database } from "@/firebase";

type AuthState = {
   user: UserFirebase | undefined | null;
   loading: boolean;
   setUser: (user: UserFirebase | undefined | null) => void;
   fetchUserInfo: (uid: string) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
   user: null,
   loading: true,
   setUser: (user) => set({ user, loading: false }),
   fetchUserInfo: async (uid: string) => {
      if (!uid) return;
      try {
         const docRef = doc(database, "users", uid);
         const docSnap = await getDoc(docRef);

         if (docSnap.exists()) {
            set({ user: docSnap.data() as UserFirebase, loading: false });
         } else {
            set({ user: null, loading: false });
         }
      } catch (error) {
         set({ user: null, loading: false });
      }
   },
}));
