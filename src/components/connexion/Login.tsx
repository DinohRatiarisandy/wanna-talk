import { signInWithPopup } from "firebase/auth";
import GmailIcon from "../logos/GmailIcon";
import { auth, database, provider } from "../../firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserFirebase } from "../models/types";

export default function Login() {
   const setUser = useAuthStore((state) => state.setUser);

   async function handleGoogleLogin(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      try {
         const result = await signInWithPopup(auth, provider);
         const user = result.user;

         const currentUserData: UserFirebase = {
            userID: user.uid,
            userName: user.displayName,
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
      } catch (error) {
         console.log("Error during Google Login:", error);
      }
   }

   return (
      <form
         onSubmit={(e) => handleGoogleLogin(e)}
         className="flex h-[100vh] w-full items-center justify-center border bg-[#060606]"
      >
         <button
            type="submit"
            className="flex w-72 cursor-pointer items-center justify-center rounded-full bg-transparent ring-2 transition hover:ring-4"
         >
            <GmailIcon size={56} />
            <p className="text-lg text-primary-foreground">
               Connect with your Gmail
            </p>
         </button>
      </form>
   );
}
