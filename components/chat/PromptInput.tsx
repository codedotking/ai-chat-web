import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { type Message } from "@/app/page";
import { fetchEventSource } from "@microsoft/fetch-event-source";
interface ComponentProps {
  className?: string;
  setMessageList: (p: (draft: Message[]) => void) => void;
}

const PromptInput: React.FC<ComponentProps> = ({
  setMessageList,
  className,
}) => {
  const [prompt, setPrompt] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };
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
    <div className={cn("flex gap-4 flex-1 items-center px-4", className)}>
      <Input
        value={prompt}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(prompt)}
        placeholder={"Type here..."}
        className="bg-[#3a3a44] text-white border-none shadow-md outline-none  focus:outline-none  h-12"
        onChange={handleChange}
      />
      <Button
        onClick={() => handleSubmit(prompt)}
        variant="outline"
        size="icon">
        <PaperPlaneIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default PromptInput;
