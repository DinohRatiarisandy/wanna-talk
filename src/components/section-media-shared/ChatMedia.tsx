import { ComponentPropsWithoutRef } from "react";
import profile1 from "../../assets/users-profiles/profile-1.jpg";
import profile2 from "../../assets/users-profiles/profile-2.jpg";
import profile3 from "../../assets/users-profiles/profile-3.jpg";
import { Download, X } from "lucide-react";
import { Button } from "../ui/button";
import { usePanelStore } from "@/store/usePanelStore";

const SHARED_IMAGES = [
   {
      uid: "asrtoein784",
      imgUrl: profile1,
   },
   {
      uid: "asrteitdk4n",
      imgUrl: profile2,
   },
   {
      uid: "astar09-oein",
      imgUrl: profile3,
   },
   {
      uid: "ascvbrtoein",
      imgUrl: profile1,
   },
   {
      uid: "asrtwfpein",
      imgUrl: profile2,
   },
   {
      uid: "astoe234in",
      imgUrl: profile3,
   },
   {
      uid: "asr89tarsoein",
      imgUrl: profile1,
   },
   {
      uid: "asr89tarsein",
      imgUrl: profile2,
   },
   {
      uid: "ast89oarsein",
      imgUrl: profile3,
   },
   {
      uid: "ascvbrto89earsin",
      imgUrl: profile1,
   },
   {
      uid: "asrtwfp89earsin",
      imgUrl: profile2,
   },
   {
      uid: "ast89oarse234in",
      imgUrl: profile3,
   },
];

type ChatMediaProps = ComponentPropsWithoutRef<"div">;

export default function ChatMedia({ className }: ChatMediaProps) {
   const { setRightPanel } = usePanelStore();

   return (
      <div className={className}>
         <header className="relative flex w-full items-center justify-center p-3 text-lg font-semibold">
            <Button
               variant="outline"
               className="absolute left-2 h-8 w-8 p-0 md:hidden"
            >
               <X
                  onClick={() => setRightPanel(false)}
                  className="cursor-pointer"
               />
            </Button>
            <p className="flex-end">Shared Media</p>
         </header>
         <main className="flex flex-wrap justify-center gap-2 overflow-scroll p-2">
            {SHARED_IMAGES.map(function (img) {
               return (
                  <div key={img.uid} className="group relative">
                     <img
                        src={img.imgUrl}
                        key={img.uid}
                        className="group-hover:contrast-90 h-32 w-32 rounded object-cover transition duration-300 group-hover:brightness-[60%]"
                     />
                     <Download
                        className="z-100 absolute right-[50%] top-[50%] hidden -translate-y-[50%] translate-x-[50%] cursor-pointer text-secondary transition duration-100 hover:text-gray-200/50 group-hover:block dark:text-white dark:hover:text-gray-400"
                        size={42}
                     />
                  </div>
               );
            })}
         </main>
      </div>
   );
}
