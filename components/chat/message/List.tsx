"use client";
import { type Message } from "@/app/page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef } from "react";
import { getMdiText } from "@/lib/markdown";
import "highlight.js/styles/github-dark.min.css";

interface ComponentProps {
  messageList: Message[];
  className?: string;
  // Add other props as needed
}

const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div className="w-full  ">
      <div className={cn("w-full  flex", isUser && " justify-end")}>
        <div
          className={cn(
            "flex gap-4 w-full  xl:w-4/5",
            isUser && "flex-row-reverse"
          )}>
          <div className=" shrink-0">
            {isUser ? (
              <div className="w-6 h-6 text-sm">You</div>
            ) : (
              <ChatBubbleIcon className="w-6 h-6 cursor-pointer" />
            )}
          </div>
          <div className="dark:bg-[#31313a] prose dark:prose-invert prose-p:my-4 shadow-md rounded-md px-4  select-text">
            <div
              className={cn(message.answering && "typing", "")}
              dangerouslySetInnerHTML={{
                __html:
                  message.role == "user"
                    ? message.content
                    : getMdiText(message.content),
              }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageList: React.FC<ComponentProps> = ({ messageList, className }) => {
  const messageListRef = useRef<HTMLDivElement>(null);
  const onScrollChange = () => {
    const ele = messageListRef.current;
    if (ele) {
      ele.scrollTop = ele?.scrollHeight;
    }
  };
  useEffect(() => {
    onScrollChange();
  }, [messageList]);
  return (
    <ScrollArea className={cn(className, "px-8 py-8")} ref={messageListRef}>
      <div className="flex flex-col gap-4">
        {messageList.map((message, index) => {
          return <MessageItem key={index} message={message} />;
        })}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
