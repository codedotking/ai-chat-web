import Chat from "@/components/chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI CHAT",
  description: "AI CHAT",
};

export default function ChatPage({
  params: { chatId },
}: {
  params: { chatId: string };
}) {
  console.log(chatId);
  return <Chat chatId={chatId} />;
}
