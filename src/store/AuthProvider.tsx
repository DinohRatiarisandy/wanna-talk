import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { auth } from "@/firebase";

type AuthProviderProps = {
   children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
   const setUser = useAuthStore((state) => state.setUser);
   const setLoading = useAuthStore((state) => state.setLoading);

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
         setUser(firebaseUser);
         setLoading(false);
      });

      return unsubscribe;
   }, [setUser, setLoading]);

   return <>{children}</>;
}
