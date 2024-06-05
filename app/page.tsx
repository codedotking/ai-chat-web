"use client";
import PromptInput from "@/components/chat/PromptInput";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

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
  uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  const handleSubmit = (prompt: string) => {
    console.log(prompt);
    router.replace(`/chat/${uuidv4()}?prompt=${prompt}`);
  };

  return (
    <main className="h-screen px-4 md:px-0  mx-auto  flex flex-col justify-center items-center ">
      <div>
        <PromptInput onSubmit={handleSubmit} className=" w-full" />
      </div>
    </main>
  );
}
