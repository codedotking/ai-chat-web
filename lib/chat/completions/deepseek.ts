import openai from "@/lib/openAiServices";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  // extract the prompt
  const { prompt } = await req.json();

  const stream = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: "Hello" },
    ],
    max_tokens: 1024,
    temperature: 0.7,
    stream: true,
  });

  // 创建 TransformStream
  const transformStream = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
  });
  // 创建 SSE 响应
  const res = new Response(transformStream.readable);
  // 设置响应头，指定使用 SSE
  res.headers.set("Content-Type", "text/event-stream");
  res.headers.set("Cache-Control", "no-cache");
  res.headers.set("Connection", "keep-alive");
  res.headers.set("Transfer-Encoding", "chunked");
  const writer = transformStream.writable.getWriter();
  // 将 SSE 数据编码为 Uint8Array
  const encoder = new TextEncoder();
  for await (const chunk of stream) {
    // process.stdout.write(chunk.choices[0]?.delta?.content || '');
    const done = chunk.choices[0]?.finish_reason === "stop";
    if (done) {
      writer.close();
      break;
    }
    const conten = `event: message\ndata: Message ${JSON.stringify(chunk)}\n\n`;
    writer.write(encoder.encode(conten));
  }
  return res;
};

export { POST };
