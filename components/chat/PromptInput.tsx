import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

interface ComponentProps {
  className?: string;
  handleSubmit: (prompt: string) => void;
}

// 提示词输入的地方
const PromptInput: React.FC<ComponentProps> = ({ handleSubmit, className }) => {
  const [prompt, setPrompt] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };
  return (
    <div className={cn("flex gap-4 flex-1 items-center px-4", className)}>
      <Textarea
        value={prompt}
        placeholder={"Type here..."}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(prompt)}
        onChange={handleChange}
        className="dark:bg-[#3a3a44] dark:text-white border-none rounded-md  shadow-md outline-none  focus:outline-none min-h-2 px-2 py-1"
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
