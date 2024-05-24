"use client";
import TextArea from "@/components/TextArea";
import { useRef, useState } from "react";

export default function Page() {

  return (
    <div className=" w-[200px] flex flex-wrap h-[150px] bg-red-200">
      <div className=" flex-grow overflow-auto break-all ">
        <TextArea />
      </div>
      <div className=" flex">
        <div className=" w-5 h-5 bg-red-900"></div>
      </div>
    </div>
  );
}
