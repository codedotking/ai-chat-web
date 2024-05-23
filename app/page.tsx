"use client";
import PromptInput from "@/components/chat/PromptInput";
import MessageList from "@/components/chat/message/List";
import { useImmer } from "use-immer";

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

export default function Home() {
  const [messageList, setMessageList] = useImmer<Message[]>([message]);
  return (
    <main className="h-screen px-4 md:px-0  xl:w-[960px] mx-auto  flex flex-col justify-between items-center ">
      <MessageList messageList={messageList} className="w-full mt-4 flex-1" />
      <div className={"w-full xl:w-10/12 space-y-2 flex justify-center  my-12"}>
        <PromptInput setMessageList={setMessageList} className=" px-8" />
      </div>
    </main>
  );
}
