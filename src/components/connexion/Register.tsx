import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { UserFirebase } from "../models/types";
import defaultAvatar from "../../assets/users-profiles/default-avatar.png";
import uploadImage from "@/lib/upload-image";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginProps } from "./LoginEmailPassword";
import { Loader2 } from "lucide-react";
import { FirebaseError } from "firebase/app";

type AvatarType = {
   file?: File;
   photoUrl: string;
};

export default function Register({ loading, setLoading }: LoginProps) {
   const [avatar, setAvatar] = useState<AvatarType>();
   const { toast } = useToast();
   const setUser = useAuthStore((state) => state.setUser);
   const [spinner, setSpinner] = useState(false);

   function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (!file) return;
      else {
         setAvatar({
            file: e.target.files?.[0],
            photoUrl: URL.createObjectURL(file),
         });
      }
   }

   async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      // Get all inputs in <form>
      const form = e?.currentTarget;
      const email = form.elements.namedItem("new-email") as HTMLInputElement;
      const username = form.elements.namedItem(
         "new-username",
      ) as HTMLInputElement;
      const password = form.elements.namedItem(
         "new-password",
      ) as HTMLInputElement;

      if (!email.value || !username.value || !password.value) {
         toast({
            variant: "destructive",
            description: "Please, fill all inputs !",
         });
         return;
      }

      setLoading(true);
      setSpinner(true);

      try {
         const res = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value,
         );

         // Upload the user's avatar into Storage
         let imgURL = "";
         if (avatar?.file) {
            imgURL = await uploadImage(avatar.file);
         }
         if (imgURL === "") {
            // Fetch the default avatar and convert it to a File object
            const response = await fetch(defaultAvatar);
            const blob = await response.blob();
            const file = new File([blob], "default-avatar.png", {
               type: "image/png",
            });
            imgURL = await uploadImage(file);
         }

         const newUser: UserFirebase = {
            userID: res.user.uid,
            userName: username.value,
            userEmail: email.value,
            userProfil: imgURL,
         };

         await setDoc(doc(database, "users", res.user.uid), newUser);
         await setDoc(doc(database, "userChatList", res.user.uid), {
            chats: [],
         });

         toast({
            title: "Account created !",
            description: `Welcome ! ${username.value}`,
         });

         setUser(newUser);
         setLoading(false);
         setSpinner(false);
      } catch (error) {
         if (error instanceof FirebaseError) {
            switch (error.code) {
               case "auth/email-already-in-use":
                  toast({
                     description: "This email is already taken !",
                     variant: "destructive",
                  });
                  break;
               case "auth/network-request-failed":
                  toast({
                     description: "Check your network !",
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
      <div className="flex w-72 flex-col gap-2">
         <h1 className="text-3xl">Create an account !</h1>
         <form onSubmit={handleRegister} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
               <label htmlFor="new-email">New Email:</label>
               <Input id="new-email" type="email" />
            </div>
            <div className="flex flex-col gap-1">
               <label htmlFor="new-username">Username:</label>
               <Input id="new-username" type="text" maxLength={10} />
            </div>
            <div className="flex flex-col gap-1">
               <label htmlFor="new-password">New Password:</label>
               <Input id="new-password" type="password" />
            </div>
            <div className="flex gap-2">
               <label htmlFor="file" className="flex cursor-pointer gap-2">
                  <img
                     src={avatar?.photoUrl || defaultAvatar}
                     className="h-16 w-16 rounded-xl object-cover"
                  />

                  <p className="self-end text-blue-500 underline hover:text-blue-500/60">
                     Change your avatar
                  </p>
               </label>
               <Input
                  type="file"
                  accept="image/*"
                  id="file"
                  className="hidden w-32"
                  onChange={(e) => handleAvatar(e)}
               />
            </div>
            <Button
               disabled={loading}
               variant="default"
               className="text-lg"
               type="submit"
            >
               {spinner && <Loader2 className="mx-1 animate-spin" />} Sign Up
            </Button>
         </form>
      </div>
   );
}
