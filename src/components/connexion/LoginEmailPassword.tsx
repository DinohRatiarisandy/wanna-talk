"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "@/firebase";
import { UserFirebase } from "../models/types";
import { doc, getDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginEmailPassword() {
   const { toast } = useToast();
   const setUser = useAuthStore((state) => state.setUser);

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
            toast({
               description: "Login Successfuly !",
            });
         }
      } catch (error) {
         toast({
            title: "User not found !",
            variant: "destructive",
            description: "Email or Password invalid.",
         });
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
            <Button type="submit" variant="default" className="text-lg">
               Sign In
            </Button>
         </form>
      </div>
   );
}
