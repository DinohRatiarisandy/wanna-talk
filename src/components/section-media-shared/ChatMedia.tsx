import { ComponentPropsWithoutRef } from "react";
import profile1 from "../../assets/users-profiles/profile-1.jpg";
import profile2 from "../../assets/users-profiles/profile-2.jpg";
import profile3 from "../../assets/users-profiles/profile-3.jpg";

const SHARED_IMAGES = [
   {
      uid: "asrtoein",
      imgUrl: profile1,
   },
   {
      uid: "asrtein",
      imgUrl: profile2,
   },
   {
      uid: "astoein",
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
   return (
      <div className={className}>
         <header className="w-full border-b p-3 text-center text-lg font-semibold">
            Shared Media
         </header>
         <main className="flex flex-wrap justify-center gap-2 overflow-scroll p-2">
            {SHARED_IMAGES.map(function (img) {
               return (
                  <img
                     src={img.imgUrl}
                     key={img.uid}
                     className="h-32 w-32 rounded object-cover"
                  />
               );
            })}
         </main>
      </div>
   );
}
