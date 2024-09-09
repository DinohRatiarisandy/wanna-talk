import { useState } from "react";
import LoginEmailPassword from "./LoginEmailPassword";
import LoginGoogle from "./LoginGoogle";
import Register from "./Register";

export default function Login() {
   const [account, setAccount] = useState(true);
   const [loading, setLoading] = useState(false);

   return (
      <div className="m-auto flex w-96 flex-col items-center gap-4 rounded border p-4 shadow">
         {account ? (
            <LoginEmailPassword loading={loading} setLoading={setLoading} />
         ) : (
            <Register loading={loading} setLoading={setLoading} />
         )}
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
         <LoginGoogle loading={loading} setLoading={setLoading} />
      </div>
   );
}
