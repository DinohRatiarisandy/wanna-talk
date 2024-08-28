import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

type MessageVariant = "own" | "friend";

type MessageCardProps = ComponentPropsWithoutRef<"div"> & {
   msgID: string;
   sender: string;
   text: string;
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
            "sm:max-w-full lg:max-w-[85%]",
            className,
         )}
      >
         <p>{props.text}</p>
      </div>
   );
}
