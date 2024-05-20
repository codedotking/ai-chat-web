import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
const POST = (request: NextRequest) => {
  console.log("niasdsadsahao1");

  const sseData = `:ok\n\nevent: message\ndata: Initial message\n\n`;
  // 将 SSE 数据编码为 Uint8Array
  const encoder = new TextEncoder();
  const sseUint8Array = encoder.encode(sseData);

  // 创建 TransformStream
  const transformStream = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
  });

  // 创建 SSE 响应
  let response = new Response(transformStream.readable);

  // 设置响应头，指定使用 SSE
  response.headers.set("Content-Type", "text/event-stream");
  response.headers.set("Cache-Control", "no-cache");
  response.headers.set("Connection", "keep-alive");
  response.headers.set("Transfer-Encoding", "chunked");

  const writer = transformStream.writable.getWriter();
  writer.write(sseUint8Array);

  // 定义一个计数器
  let counter = 0;

  // // 每秒发送一个消息
  // const interval = setInterval(() => {
  //     counter++

  //     if (counter > 10) {
  //         clearInterval(interval)
  //         return
  //     }

  //     const message = `event: message\ndata: Message ${counter}\n\n`
  //     const messageUint8Array = encoder.encode(message)
  //     writer.write(messageUint8Array)
  // }, 1000)

  return response;
};

export { POST };
