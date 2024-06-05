import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";
interface ComponentProps {
  className?: string;
  onSubmit: (prompt: string) => void;
}

/**
 * 提示词输入组件
 * @param ComponentProps ComponentProps
 * @returns JSX.Element
 */
const PromptInput = memo<ComponentProps>(function PromptInput({
  className,
  onSubmit,
}) {
  const [prompt, setPrompt] = useState<string>("");
  const enableSubmit = useMemo(() => {
    return prompt.trim().length > 0;
  }, [prompt]);
  const handleSubmit = () => {
    if (prompt.trim().length > 0) {
      onSubmit(prompt);
      setPrompt("");
    }
  };
  return (
    <div
      className={cn(
        "flex w-full flex-wrap py-3 xl:w-[960px] bg-[#45454e] rounded-md gap-4 px-4",
        className
      )}>
      {/* 输入框 */}
      <div className="flex-grow overflow-auto break-all flex items-center">
        <TextareaAutosize
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter" && e.ctrlKey) {
              handleSubmit();
            }
          }}
          className="overflow-y-auto max-h-32 w-full text-white bg-transparent  border-none focus-visible:outline-none"
        />
      </div>
      <div className="flex items-end mr-auto">
        <Button
          disabled={!enableSubmit}
          onClick={() => handleSubmit()}
          variant="outline"
          size="icon">
          <PaperPlaneIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
});

export default PromptInput;
