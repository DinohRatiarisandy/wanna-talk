import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ComponentPropsWithoutRef } from "react";

type UserInfoProps = ComponentPropsWithoutRef<"div"> & {
   userProfil: string | undefined | null;
   userName: string | undefined | null;
};

export default function UserInfo(props: UserInfoProps) {
   return (
      <div className={`p-1.5 ${props.className}`}>
         <Avatar>
            {typeof props.userProfil === "string" ? (
               <AvatarImage src={props.userProfil} />
            ) : (
               <AvatarFallback>No image</AvatarFallback>
            )}
         </Avatar>
         <div>
            <h1>{props.userName}</h1>
            {props.children}
         </div>
      </div>
   );
}
