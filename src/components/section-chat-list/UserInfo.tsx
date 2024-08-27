import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import userProfile from "../../assets/users-profiles/my-profile.jpeg";
import { Avatar } from "../ui/avatar";

export default function UserInfo() {
   return (
      <div>
         <Avatar>
            <AvatarImage src={userProfile} />
            <AvatarFallback>RDL</AvatarFallback>
         </Avatar>
      </div>
   );
}
