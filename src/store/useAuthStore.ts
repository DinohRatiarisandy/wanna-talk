import { create } from "zustand";
import { UserInfos } from "@/components/models/types";

type AuthState = {
   user: UserInfos | undefined | null;
   isLoading: boolean;
   setUser: (user: UserInfos | undefined | null) => void;
   setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>(function (set) {
   return {
      user: null,
      isLoading: true,
      setUser: (user) => set({ user, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
   };
});
