import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import { ComponentPropsWithoutRef } from "react";

type UserInfoProps = ComponentPropsWithoutRef<"div"> & {
   userProfile: string;
   userName: string;
};

export default function UserInfo(props: UserInfoProps) {
   return (
      <div className={`p-1.5 ${props.className}`}>
         <Avatar>
            <AvatarImage src={props.userProfile} />
            <AvatarFallback>RDL</AvatarFallback>
         </Avatar>
         <div>
            <h1>{props.userName}</h1>
            {props.children}
         </div>
      </div>
   );
}
