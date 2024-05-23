import { genAccessToken } from "@/lib/chat/baidu";
import { NextRequest } from "next/server";

const POST = async (req: NextRequest) => {
  const params = await req.json();
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
  // 将 SSE 数据编码为 Uint8Array
  const token = await genAccessToken();
  const url =
    "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie_speed?access_token=" +
    token;
  const stream = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return new Response(stream.body, {
    status: stream.status,
    statusText: stream.statusText,
    headers: stream.headers,
  });
};

export { POST };
