import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Textarea from "@/components/TextArea";
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
  const textRef = useRef<string>("");
  const [enableSubmit, setEnableSubmit] = useState(false);
  const handleSubmit = () => {
    if (textRef.current.trim().length > 0) {
      onSubmit(textRef.current);
      textRef.current = "";
      setEnableSubmit(false);
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
        <Textarea
          value={textRef.current}
          className="overflow-y-auto max-h-32 w-full text-white bg-transparent  border-none focus-visible:outline-none"
          onKeyDown={(e) => {
            if (e.key == "Enter" && e.ctrlKey) {
              handleSubmit();
            }
          }}
          onChange={(pro) => {
            textRef.current = pro;
            setEnableSubmit(pro.trim().length > 0);
          }}
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
