import { genAccessToken } from "@/lib/chat/baidu";
import { NextRequest } from "next/server";
import axios from "axios";
import { parseSSE } from "@/lib/sse";

const POST = async (req: NextRequest) => {
  const { prompt } = await req.json();
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
  const token = await genAccessToken();
  const url =
    "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie_speed?access_token=" +
    token;

  const stream = await axios({
    method: "post",
    url: url,
    responseType: "stream",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: true,
    }),
  });

  stream.data.on("data", (chunk: Buffer) => {
    let { data: _chunk } = parseSSE(chunk.toString("utf-8"));
    console.log(_chunk);
    
    try {
      const _c = JSON.parse(_chunk) as {
        result: string;
        id: string;
        is_end: boolean;
      };
      if(_c.is_end){
        writer.close();
        return;
      }
      const conten = `id:${_c.id}\nevent: message\ndata: ${_c.result}\n\n`;
      writer.write(encoder.encode(conten));
    } catch (error) {
      console.log("ccc", error);
    }
  });
  stream.data.on("end", () => {});
  return res;
};

export { POST };
