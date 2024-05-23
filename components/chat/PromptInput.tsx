import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

interface ComponentProps {
  className?: string;
  handleSubmit: (prompt: string) => void;
}

// 提示词输入的地方
const PromptInput: React.FC<ComponentProps> = ({ handleSubmit, className }) => {
  const [prompt, setPrompt] = useState("");

  const enableSubmit = useMemo(() => {
    return prompt.trim().length > 0;
  }, [prompt]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-1 gap-4  flex-col  px-2 py-2 xl:w-[960px]  bg-[#45454e] rounded-md",
        className
      )}>
      <Textarea
        ref={textareaRef}
        value={prompt}
        placeholder={"Type here..."}
        onKeyDown={(e) => {
          // ctrl + enter
          if (e.ctrlKey && e.key === "Enter") {
            handleSubmit(prompt);
          }
        }}
        onChange={handleChange}
        className="border-none w-full  resize-none  text-white rounded-md min-h-8
         max-h-[200px]
         flex-1x
        focus-visible:outline-none
        outline-none
         focus:outline-none"
      />
      <div className="flex-1 flex justify-end">
        <Button
          disabled={!enableSubmit}
          onClick={() => enableSubmit && handleSubmit(prompt)}
          variant="outline"
          size="icon">
          <PaperPlaneIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PromptInput;
