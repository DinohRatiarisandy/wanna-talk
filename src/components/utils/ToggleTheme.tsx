import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/utils/theme-provider";

type ToggleThemeProps = {
   size?: number;
};

export function ToggleTheme({ size = 24 }: ToggleThemeProps) {
   const { theme } = useTheme();

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
