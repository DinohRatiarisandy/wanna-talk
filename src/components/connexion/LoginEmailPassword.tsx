"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "@/firebase";
import { UserFirebase } from "../models/types";
import { doc, getDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { FirebaseError } from "firebase/app";

export type LoginProps = {
   loading: boolean;
   setLoading: (l: boolean) => void;
};

export default function LoginEmailPassword({
   loading,
   setLoading,
}: LoginProps) {
   const { toast } = useToast();
   const setUser = useAuthStore((state) => state.setUser);
   const [spinner, setSpinner] = useState(false);

   async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      try {
         // Get all inputs in <form>
         const form = e?.currentTarget;
         const email = form.elements.namedItem(
            "user-email",
         ) as HTMLInputElement;
         const password = form.elements.namedItem(
            "user-password",
         ) as HTMLInputElement;

         if (!email.value || !password.value) {
            toast({
               variant: "destructive",
               description: "Please, fill all inputs !",
            });
            return;
         }

         setLoading(true);
         setSpinner(true);

         // Sign in
         const result = await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value,
         );
         const user = result.user;

         // Set the current user
         const userDocRef = doc(database, "users", user.uid);
         const docSnapshot = await getDoc(userDocRef);

         if (docSnapshot.exists()) {
            setUser(docSnapshot.data() as UserFirebase);
            setLoading(false);
            setSpinner(false);
            toast({
               description: "Login Successfuly !",
            });
         }
      } catch (error) {
         if (error instanceof FirebaseError) {
            console.log(error.code);
            switch (error.code) {
               case "auth/network-request-failed":
                  toast({
                     description: "Check your network !",
                     variant: "destructive",
                  });
                  break;
               case "auth/invalid-credential":
                  toast({
                     description: "email or password invalid !",
                     variant: "destructive",
                  });
                  break;
               case "auth/too-many-requests":
                  toast({
                     description:
                        "Access to this account has been temporarily disabled due to many failed login attempts. Try again later !",
                  });
                  break;
               default:
                  toast({
                     description: `${error.message}`,
                     variant: "destructive",
                  });
            }
         }
         setLoading(false);
         setSpinner(false);
      }
   }

   return (
      <div className="flex w-72 flex-col gap-4">
         <h1 className="text-3xl">Welcome back ! 😎</h1>
         <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
               <label htmlFor="user-email">Email:</label>
               <Input id="user-email" type="email" />
            </div>
            <div className="flex flex-col gap-1">
               <label htmlFor="user-password">Password:</label>
               <Input id="user-password" type="password" />
            </div>
            <Button
               type="submit"
               variant="default"
               className="text-lg"
               disabled={loading}
            >
               {spinner && <Loader2 className="mx-1 animate-spin" />} Sign In
            </Button>
         </form>
      </div>
   );
}
