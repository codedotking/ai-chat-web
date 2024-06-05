"use client";
import TextArea from "@/components/TextArea";
import { useState } from "react";

export default function Page() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className=" w-[200px] flex flex-wrap h-[150px] bg-red-200">
      <div className=" flex-grow overflow-auto break-all ">
        <TextArea
          onChange={(pro) => {
            setPrompt(pro);
          }}
          onKeyDown={(e) => {
            console.log(prompt);
          }}
        />
      </div>

      <button onClick={() => console.log(prompt)}>按钮</button>
    </div>
  );
}
