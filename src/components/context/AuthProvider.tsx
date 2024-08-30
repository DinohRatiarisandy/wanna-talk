import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../utils/firebase";
import { User } from "firebase/auth";

type AuthProviderProps = {
   children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
   const [user, setUser] = useState<User | null>(null);

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
         setUser(firebaseUser);
      });

      return unsubscribe;
   }, []);

   return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
