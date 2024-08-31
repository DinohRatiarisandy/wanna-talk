import { auth } from "@/firebase";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function Logout() {
   return (
      <DropdownMenuItem
         onClick={async () => {
            await auth.signOut();
         }}
         className="flex cursor-pointer gap-1"
      >
         <LogOut size={18} />
         <span>Logout</span>
      </DropdownMenuItem>
   );
}
