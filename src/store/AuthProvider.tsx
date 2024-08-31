import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { auth } from "@/firebase";
import { UserFirebase } from "@/components/models/types";

type AuthProviderProps = {
   children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
   const setUser = useAuthStore((state) => state.setUser);
   const setLoading = useAuthStore((state) => state.setLoading);
   const user = useAuthStore((state) => state.user);

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
         const currentUserData: UserFirebase = {
            userID: firebaseUser?.uid,
            userName: firebaseUser?.displayName,
            userEmail: firebaseUser?.email,
            userProfil: firebaseUser?.photoURL,
         };
         setUser(currentUserData);
         setLoading(false);
      });

      return () => unsubscribe();
   }, [setUser, setLoading, user?.userID]);

   return <>{children}</>;
}
