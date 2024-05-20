import { type Message } from "@/app/page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import React from "react";

interface ComponentProps {
  messageList: Message[];
  className?: string;
  // Add other props as needed
}

const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div className="w-full text-white">
      <div className={cn("w-full text-white flex", isUser && " justify-end")}>
        <div
          className={cn(
            "flex gap-4 items-center",
            isUser && "flex-row-reverse"
          )}>
          <div className=" shrink-0">
            {isUser ? (
              <div className="h-6 w-6 text-white">You</div>
            ) : (
              <ChatBubbleIcon className="w-5 h-5 cursor-pointer" />
            )}
          </div>
          <div className="bg-[#31313a] shadow-md  rounded-md px-4 py-4 ">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageList: React.FC<ComponentProps> = ({ messageList, className }) => {
  return (
    <ScrollArea className={cn(className)}>
      <div className="flex flex-col gap-4">
        {messageList.map((message, index) => {
          return <MessageItem key={index} message={message} />;
        })}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
