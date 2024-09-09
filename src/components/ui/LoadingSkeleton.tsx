import { useThemeStore } from "@/store/useThemeStore";

export default function LoadingSkeleton() {
   const { theme } = useThemeStore();

   return (
      <div
         className={`${theme} flex h-screen flex-col items-center justify-center gap-1`}
      >
         <div className="flex gap-1">
            <div className="h-5 w-5 animate-bounce rounded-full bg-accent delay-75" />
            <div className="h-6 w-6 animate-bounce rounded-full bg-accent delay-100" />
            <div className="h-6 w-6 animate-bounce rounded-full bg-accent delay-200" />
            <div className="h-5 w-5 animate-bounce rounded-full bg-accent delay-300" />
         </div>
      </div>
   );
}
