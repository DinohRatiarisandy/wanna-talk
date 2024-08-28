import { ComponentPropsWithoutRef } from "react";

type ChatMediaProps = ComponentPropsWithoutRef<"div"> & {};

export default function ChatMedia({ className, ...props }: ChatMediaProps) {
   return <div className={className}>ChatMedia</div>;
}
