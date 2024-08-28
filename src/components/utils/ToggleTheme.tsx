import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/utils/theme-provider";
import { ComponentPropsWithoutRef } from "react";

export function ToggleTheme(props: ComponentPropsWithoutRef<"button">) {
   const { theme, setTheme } = useTheme();

   function toggleTheme() {
      if (theme === "dark") return "light";
      else return "dark";
   }

   return (
      <Button
         variant="outline"
         size="icon"
         onClick={() => setTheme(toggleTheme())}
         className={`${props.className} ring ring-accent`}
      >
         <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
         <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
   );
}
