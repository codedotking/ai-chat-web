"use client";
import PromptInput from "@/components/chat/PromptInput";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const handleSubmit = (prompt: string) => {
    console.log(prompt);
    router.push(`/chat?prompt=${prompt}`);
  };

  return (
    <main className="h-screen px-4 md:px-0  mx-auto  flex flex-col justify-center items-center ">
      <div>
        <PromptInput handleSubmit={handleSubmit} className=" w-full" />
      </div>
    </main>
  );
}
