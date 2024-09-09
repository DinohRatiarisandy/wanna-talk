import { auth } from "@/firebase";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { usePanelStore } from "@/store/usePanelStore";

export default function Logout() {
   const { user } = useAuthStore();
   const { setLeftPanel } = usePanelStore();
   const setChatId = useChatStore((state) => state.setChatId);
   return (
      <DropdownMenuItem
         onClick={async () => {
            await auth.signOut();
            setChatId(undefined);
            setLeftPanel(false);
         }}
         className="flex cursor-pointer gap-1"
      >
         <LogOut size={18} />
         <span>Logout:</span>
         <i>{user?.userName}</i>
      </DropdownMenuItem>
   );
}
