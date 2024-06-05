"use client";
import { cn } from "@/lib/utils";
import * as React from "react";
import { type KeyboardEventHandler, type KeyboardEvent } from "react";
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
  const handleChange = (evt: ContentEditableEvent) => {
    onChange && onChange(evt.target.value);
  };
  const handleKeyDown: KeyboardEventHandler = (
    evt: KeyboardEvent<HTMLDivElement>
  ) => onKeyDown && onKeyDown(evt);

  return (
    <ContentEditable
      html={value}
      className={cn("whitespace-pre-wrap", className)}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  );
};

export default TextArea;
