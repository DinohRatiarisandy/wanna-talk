import { auth } from "@/firebase";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

export default function Logout() {
   const { user } = useAuthStore();
   const setChatId = useChatStore((state) => state.setChatId);
   return (
      <DropdownMenuItem
         onClick={async () => {
            await auth.signOut();
            setChatId(undefined);
         }}
         className="flex cursor-pointer gap-1"
      >
         <LogOut size={18} />
         <span>Logout:</span>
         <i>{user?.userName}</i>
      </DropdownMenuItem>
   );
}
