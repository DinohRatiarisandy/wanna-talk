import React, { useState } from "react";
import GmailIcon from "../logos/GmailIcon";
import { signInWithPopup } from "firebase/auth";
import { UserFirebase } from "../models/types";
import { auth, database, provider } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginProps } from "./LoginEmailPassword";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { FirebaseError } from "firebase/app";

export default function LoginGoogle({ loading, setLoading }: LoginProps) {
   const setUser = useAuthStore((state) => state.setUser);
   const [spinner, setSpinner] = useState(false);

   async function handleGoogleLogin(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setSpinner(true);
      setLoading(true);

      try {
         const result = await signInWithPopup(auth, provider);
         const user = result.user;

         const currentUserData: UserFirebase = {
            userID: user.uid,
            userName: user.displayName?.slice(0, 10),
            userEmail: user.email,
            userProfil: user.photoURL,
         };

         const userDocRef = doc(database, "users", user.uid);
         const docSnapshot = await getDoc(userDocRef);

         if (docSnapshot.exists()) {
            await setDoc(userDocRef, currentUserData, { merge: true });
         } else {
            await setDoc(userDocRef, currentUserData);
            const userChatListDocRef = doc(database, "userChatList", user.uid);
            await setDoc(userChatListDocRef, { chats: [] });
         }
         setUser(currentUserData);
         setSpinner(false);
         setLoading(false);
      } catch (error) {
         if (error instanceof FirebaseError) {
            switch (error.code) {
               case "auth/popup-closed-by-user":
                  toast({
                     description: "Please, don't close the popup !",
                     variant: "destructive",
                  });
                  break;
               default:
                  toast({
                     description: `${error.message}`,
                     variant: "destructive",
                  });
            }
         }
         setSpinner(false);
         setLoading(false);
      }
   }
   return (
      <form onSubmit={handleGoogleLogin}>
         <Button
            disabled={loading}
            type="submit"
            variant="outline"
            className="rounded-full"
         >
            <div className="flex items-center">
               <GmailIcon size={42} />
               <div className="text-lg text-secondary-foreground dark:text-primary-foreground">
                  {spinner ? (
                     <div className="flex">
                        <Loader2 size="24" className="mx-1 animate-spin" />{" "}
                        Loading...
                     </div>
                  ) : (
                     "Connect with Gmail"
                  )}
               </div>
            </div>
         </Button>
      </form>
   );
}
