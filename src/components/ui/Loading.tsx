import { useThemeStore } from "@/store/useThemeStore";
import { Skeleton } from "./skeleton";

export default function Loading() {
   const { theme } = useThemeStore();

   return (
      <div className={`${theme} flex h-[80vh]`}>
         {/**
          *
          * Skeleton for user's chat list
          *
          */}

         <div className="mt-8 flex flex-[1] flex-col gap-4 p-2">
            <div className="flex items-center">
               <Skeleton className="h-12 w-12 rounded-full" />
               <div className="space-y-2">
                  <Skeleton className="h-3 w-[5rem]" />
                  <Skeleton className="h-4 w-[8rem]" />
               </div>
            </div>
            <div className="flex items-center">
               <Skeleton className="h-12 w-12 rounded-full" />
               <div className="space-y-2">
                  <Skeleton className="h-3 w-[5rem]" />
                  <Skeleton className="h-4 w-[8rem]" />
               </div>
            </div>
            <div className="flex items-center">
               <Skeleton className="h-12 w-12 rounded-full" />
               <div className="space-y-2">
                  <Skeleton className="h-3 w-[5rem]" />
                  <Skeleton className="h-4 w-[8rem]" />
               </div>
            </div>
            <div className="flex items-center">
               <Skeleton className="h-12 w-12 rounded-full" />
               <div className="space-y-2">
                  <Skeleton className="h-3 w-[5rem]" />
                  <Skeleton className="h-4 w-[8rem]" />
               </div>
            </div>
         </div>

         {/**
          *
          * Skeleton for discussion
          *
          */}
         <div className="flex h-[80vh] flex-[2] flex-col">
            <div className="flex items-center gap-2 p-2">
               <Skeleton className="h-12 w-12 rounded-full" />
               <div className="space-y-2">
                  <Skeleton className="h-3 w-[100px]" />
               </div>
            </div>
            <div className="flex flex-col gap-4 p-2">
               <Skeleton className="h-24 w-[8rem] self-end lg:h-32 lg:w-[300px]" />
               <Skeleton className="h-12 w-[8rem] lg:w-[250px]" />
               <Skeleton className="h-12 w-[8rem] self-end lg:w-[250px]" />
               <Skeleton className="h-24 w-[8rem] lg:h-32 lg:w-[300px]" />
            </div>
         </div>

         {/**
          *
          * Skeleton for Media shared
          *
          */}
         <div className="hidden h-[80vh] flex-[1] p-2 md:flex">
            <div className="flex flex-wrap items-center justify-center gap-2">
               <Skeleton className="h-28 w-28" />
               <Skeleton className="h-28 w-28" />
               <Skeleton className="h-28 w-28" />
               <Skeleton className="h-28 w-28" />
               <Skeleton className="h-28 w-28" />
               <Skeleton className="h-28 w-28" />
            </div>
         </div>
      </div>
   );
}
