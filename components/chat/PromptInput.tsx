import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Textarea from "../TextArea";

interface ComponentProps {
  className?: string;
  onSubmit: (prompt: string) => void;
}

/**
 * 提示词输入组件
 * @param ComponentProps ComponentProps
 * @returns JSX.Element
 */
const PromptInput: React.FC<ComponentProps> = ({ onSubmit, className }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [enableSubmit, setEnableSubmit] = useState<boolean>(false);

  useEffect(() => {
    setEnableSubmit(prompt.trim().length > 0);
  }, [prompt]);

  const handleSubmit = useCallback(() => {
    enableSubmit && onSubmit(prompt);
  }, [prompt, onSubmit, enableSubmit]);

  const handleCtrlEnter = (e: React.KeyboardEvent<Element>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap py-3 xl:w-[960px] bg-[#45454e] rounded-md gap-4 px-4",
        className
      )}>
      {/* 输入框 */}
      <div className="flex-grow overflow-auto break-all flex items-center">
        <Textarea
          className="overflow-y-auto max-h-32 w-full text-white bg-transparent  border-none focus-visible:outline-none"
          value={prompt}
          onKeyDown={handleCtrlEnter}
          onChange={(str: string) => {
            setPrompt(str);
          }}
        />
      </div>
      <div className="flex items-end mr-auto">
        <Button
          disabled={!enableSubmit}
          onClick={handleSubmit}
          variant="outline"
          size="icon">
          <PaperPlaneIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PromptInput;
