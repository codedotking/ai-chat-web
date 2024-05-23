"use client";
import PromptInput from "@/components/chat/PromptInput";
import MessageList from "@/components/chat/message/List";
import { useImmer } from "use-immer";
import { toast } from "react-hot-toast";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import React from "react";
export type Message = {
  content: string;
  role: string;
  answering: boolean;
};

const message = {
  content: `你好，请问有什么帮助么？`,
  role: "assistant",
  answering: false,
};

interface ChatProps {
  chatId: string;
}

const Chat: React.FC<ChatProps> = ({ chatId }) => {
  const [messageList, setMessageList] = useImmer<Message[]>([message]);
  const handleSubmit = async (prompt: string) => {
    try {
      // check if prompt is empty
      if (prompt.trim().length === 0) {
        toast.error("提示词不能为空");
        return;
      }
      const messages: { content: string; role: string }[] = [];
      // 封装 messages
      setMessageList((draft) => {
        draft.push({
          content: prompt,
          role: "user",
          answering: false,
        });
        draft.map((item, index) => {
          if (index == 0) {
            return;
          }
          messages.push({
            content: item.content,
            role: item.role,
          });
        });
      });
      const params = {
        messages,
        stream: true,
      };

      setMessageList((draft) => {
        draft.push({
          content: "",
          role: "assistant",
          answering: true,
        });
      });
      // make a POST call to our api route
      fetchEventSource("/api/chat/completions", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(params),
        onmessage: (msg) => {
          const { data = "" } = msg;
          const chunkJson = JSON.parse(data) as {
            result: string;
            is_end: boolean;
            id: number;
          };
          setMessageList((draft) => {
            const message = draft[draft.length - 1].content;
            draft[draft.length - 1].content = message + chunkJson.result;
          });
        },
        onclose: () => {
          setMessageList((draft) => {
            draft[draft.length - 1].answering = false;
          });
        },
        onerror: (e) => {},
      });
    } catch (e: any) {
      alert(`error: ${e?.message}`);
    }
  };

  return (
    <main className="h-screen px-4 md:px-0  xl:w-[960px] mx-auto  flex flex-col justify-between items-center ">
      <MessageList messageList={messageList} className="w-full mt-4 flex-1" />
      <div className={"w-full xl:w-10/12 space-y-2 flex justify-center  my-12"}>
        <PromptInput handleSubmit={handleSubmit}  />
      </div>
    </main>
  );
};

export default Chat;
