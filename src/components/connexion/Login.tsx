import { useState } from "react";
import LoginEmailPassword from "./LoginEmailPassword";
import LoginGoogle from "./LoginGoogle";
import Register from "./Register";

export default function Login() {
   const [account, setAccount] = useState(true);

   return (
      <div className="m-auto flex w-96 flex-col items-center gap-4 border p-4 shadow">
         {account ? <LoginEmailPassword /> : <Register />}
         <div className="flex gap-2">
            <p className="text-muted-foreground">
               {account
                  ? "Don't have an account yet ?"
                  : "Already have an account !"}
            </p>
            <a
               onClick={() => setAccount((prev) => !prev)}
               className="cursor-pointer self-end text-blue-500 underline hover:text-blue-500/60"
            >
               {account ? "Register" : "Login"}
            </a>
         </div>
         <LoginGoogle />
      </div>
   );
}
