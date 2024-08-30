import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";

type ToggleThemeProps = {
   size?: number;
};

export function ToggleTheme({ size = 24 }: ToggleThemeProps) {
   const { theme } = useThemeStore();

   return (
      <div>
         <Moon
            size={size}
            className={`${theme === "dark" ? "hidden" : "block"}`}
         />
         <Sun
            size={size}
            className={`${theme === "light" ? "hidden" : "block"}`}
         />
      </div>
   );
}
