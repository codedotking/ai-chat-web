"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChatPage() {
  // 重定向到 / 页面
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  });
  return <></>;
}
