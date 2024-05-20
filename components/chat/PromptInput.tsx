import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import toast from "react-hot-toast";
import { fetchEventSource } from "@/lib/fetchEventSource";
import { parseSSE } from "@/lib/sse";
import { cn } from "@/lib/utils";
import { type Message } from "@/app/page";

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
      setMessageList((draft) => {
        draft.push({
          content: prompt,
          role: "user",
        });
        draft.push({
          content: "",
          role: "system",
        });
      });
      // make a POST call to our api route
      fetchEventSource("/api/chat/completions", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ prompt }),
        onopen: () => {},
        onmessage: (d) => {
          setMessageList((draft) => {
            const message = draft[draft.length - 1].content;
            draft[draft.length - 1].content = message + parseSSE(d).data;
          });
        },
        onclose: () => {
          setPrompt("");
        },
        onerror: (e) => {},
      });
    } catch (e: any) {
      alert(`error: ${e?.message}`);
    }
  };

  return (
    <div className={cn("flex gap-4 flex-1 items-center", className)}>
      <Input
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
