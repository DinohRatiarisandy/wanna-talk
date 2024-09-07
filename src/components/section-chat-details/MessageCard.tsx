import clsx from "clsx";
import { Download } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

type MessageVariant = "own" | "friend";

type MessageCardProps = ComponentPropsWithoutRef<"div"> & {
   senderId: string;
   text: string;
   sendAt: Date;
   image?: string;
   variant?: MessageVariant;
};

export default function MessageCard({
   className,
   variant = "own",
   ...props
}: MessageCardProps) {
   return (
      <div
         className={clsx(
            {
               "self-end rounded-b rounded-l bg-primary p-1 text-primary-foreground":
                  variant === "own",
               "self-start rounded-b rounded-r bg-secondary p-1 text-secondary-foreground":
                  variant === "friend",
            },
            `${props.image ? "w-[50%] bg-transparent" : ""} sm:max-w-full lg:max-w-[75%]`,
            className,
         )}
      >
         {props.image ? (
            <div className="relative">
               <img src={props.image} className="rounded-xs" />
               <Download
                  size={18}
                  className={`absolute ${variant === "own" ? "-left-8" : "-right-8"} bottom-[50%] cursor-pointer rounded-xl text-accent transition-all hover:text-accent-foreground`}
               />
            </div>
         ) : (
            <p>{props.text}</p>
         )}
      </div>
   );
}
