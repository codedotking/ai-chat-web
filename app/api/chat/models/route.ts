import { modelsList } from "@/models";
import { NextResponse } from "next/server";

const GET = async () => {
  console.log(modelsList);
  
  return NextResponse.json({
    data: modelsList,
    code: 200,
    message: "ok",
  });
};

export { GET };
