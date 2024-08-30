import clsx from "clsx";
import { Download } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

type MessageVariant = "own" | "friend";

type MessageCardProps = ComponentPropsWithoutRef<"div"> & {
   msgID: string;
   sender: string;
   content: string;
   isContentImg?: boolean;
   sendAt: string;
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
               "self-end rounded bg-primary p-1 text-primary-foreground":
                  variant === "own",
               "rounded bg-secondary p-1 text-secondary-foreground":
                  variant === "friend",
            },
            `${props.isContentImg ? "w-[50%] bg-transparent" : ""} sm:max-w-full lg:max-w-[85%]`,
            className,
         )}
      >
         {props.isContentImg ? (
            <div className="relative">
               <img src={props.content} className="rounded-xs" />
               <Download
                  size={18}
                  className={`absolute ${variant === "own" ? "-left-8" : "-right-8"} bottom-[50%] cursor-pointer rounded-xl text-accent transition-all hover:text-accent-foreground`}
               />
            </div>
         ) : (
            <p>{props.content}</p>
         )}
      </div>
   );
}
