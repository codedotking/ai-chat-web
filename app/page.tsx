"use client";
import PromptInput from "@/components/chat/PromptInput";
import MessageList from "@/components/chat/message/List";
import { useImmer } from "use-immer";

export type Message = {
  content: string;
  role?: string;
};

const message = {
  content: `你好，请问有什么帮助么？`,
};

export default function Home() {
  const [messageList, setMessageList] = useImmer<Message[]>([message]);
  return (
    <main className="min-h-screen px-4 md:px-0 max-w-3xl mx-auto  flex flex-col  justify-between items-center ">
      <MessageList messageList={messageList} className="w-full mt-4" />
      <div className={"w-[100%] space-y-2 flex justify-center  mb-8"}>
        <PromptInput setMessageList={setMessageList} />
      </div>
    </main>
  );
}
