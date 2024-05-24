"use client";
import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";

export default function TextArea() {
  const text = useRef("");

  const handleChange = (evt: any) => {
    text.current = evt.target.value;
  };

  const handleBlur = () => {
    console.log(text.current);
  };

  return (
    <div className=" w-[200px] flex flex-wrap h-[150px] bg-red-200">
      <div className=" flex-grow overflow-auto break-all ">
        <ContentEditable
          html={text.current}
          onBlur={handleBlur}
          onKeyDown={(event: any) => {
            if (event.key === "Enter") {
              // 追加回车
              event.target.innerHTML += "\n";
              event.preventDefault();
            }
          }}
          onChange={handleChange}
        />
      </div>
      <div className=" flex">
        <div className=" w-5 h-5 bg-red-900"></div>
      </div>
    </div>
  );
}
