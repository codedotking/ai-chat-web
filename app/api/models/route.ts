import openai from "@/lib/openAiServices";
import { NextResponse } from "next/server";

const GET = async () => {
  const { data = [] } = await openai.models.list();
  return NextResponse.json({
    data,
    code: 200,
    message: "ok",
  });
};

export { GET };
