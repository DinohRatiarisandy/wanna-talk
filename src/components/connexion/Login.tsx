import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GmailIcon from "../logos/GmailIcon";
import { auth, provider } from "../utils/firebase";

export default function Login() {
   async function handleGoogleLogin(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      try {
         await signInWithPopup(auth, provider)
            .then((result) => {
               // This gives you a Google Access Token. You can use it to access the Google API.
               const credential =
                  GoogleAuthProvider.credentialFromResult(result);
               const token = credential?.accessToken;
               // The signed-in user info.
               const user = result.user;
               // IdP data available using getAdditionalUserInfo(result)
               // ...
            })
            .catch((error) => {
               // Handle Errors here.
               const errorCode = error.code;
               const errorMessage = error.message;
               // The email of the user's account used.
               const email = error.customData.email;
               // The AuthCredential type that was used.
               const credential = GoogleAuthProvider.credentialFromError(error);
               // ...
            });
      } catch (error) {
         console.log(error);
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
               Connect with your gmail
            </p>
         </button>
      </form>
   );
}
