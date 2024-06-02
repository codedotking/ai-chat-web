"use client";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";

interface TextAreaProps {
  className?: string;
  onKeyDown?: (event: any) => void;
  onChange?: (event: any) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  className,
  onKeyDown,
  onChange,
}) => {
  const text = useRef("");
  const handleChange = (evt: any) => {
    text.current = evt.target.value;
  };
  return (
    <ContentEditable
      html={text.current}
      className={cn("whitespace-pre-wrap", className)}
      onKeyDown={(event: any) => {
        onKeyDown && onKeyDown(event);
        // if (event.key === "Enter" && event.ctrlKey) {
        //   return;
        // }
      }}
      onChange={(evt: any) => {
        onChange && onChange("Niahi1");
      }}
    />
  );
};
export default TextArea;
