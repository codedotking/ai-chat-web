"use client";
import { cn } from "@/lib/utils";
import {
  useRef,
  type KeyboardEventHandler,
  type KeyboardEvent,
  useEffect,
} from "react";
import ContentEditable, {
  type ContentEditableEvent,
} from "react-contenteditable";
interface TextAreaProps {
  className?: string;
  value?: string;
  onKeyDown?: (evt: KeyboardEvent) => void;
  onChange?: (str: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  value = "",
  className,
  onKeyDown,
  onChange,
}) => {
  const text = useRef(value);
  useEffect(() => {
    text.current = value;
  }, [value]);

  const handleChange = (evt: ContentEditableEvent) => {
    text.current = evt.target.value;
    onChange && onChange(text.current);
  };

  const handleKeyDown: KeyboardEventHandler = (
    evt: KeyboardEvent<HTMLDivElement>
  ) => onKeyDown && onKeyDown(evt);

  return (
    <ContentEditable
      html={text.current}
      className={cn("whitespace-pre-wrap", className)}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  );
};

export default TextArea;
