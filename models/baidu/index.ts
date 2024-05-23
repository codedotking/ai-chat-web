export const BASE_URL = "https://aip.baidubce.com/oauth/2.0/";

export const genAccessToken = async () => {
  const APP_API_KEY = process.env.BAIDU_API_KEY;
  const APP_SECRET_KEY = process.env.BAIDU_SECRET_KEY;
  const res = await fetch(
    `${BASE_URL}/token?grant_type=client_credentials&client_id=${APP_API_KEY}&client_secret=${APP_SECRET_KEY}`
  );
  const { access_token = "" } = await res.json();
  return access_token;
};

const handleChat = async (params: object, modelName: string) => {
  // 将 SSE 数据编码为 Uint8Array
  const token = await genAccessToken();
  const url = `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/${modelName}?access_token=${token}`;
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

export const ERNIESpeed128K: AiModel = {
  name: "ERNIESpeed128K",
  chat: (params: object) => handleChat(params, "ernie_speed"),
};

export const ERNIESpeed8K: AiModel = {
  name: "ERNIESpeed8K",
  chat: (params: object) => handleChat(params, "ernie-speed-128k"),
};

export const ERNIELite8K0308: AiModel = {
  name: "ERNIELite8K0308",
  chat: (params: object) => handleChat(params, "ernie-lite-8k"),
};

export const ERNIELite8K0922: AiModel = {
  name: "ERNIELite8K0922",
  chat: (params: object) => handleChat(params, "eb-instant"),
};

export const baiduFreeAiModels = {
  ERNIESpeed128K: ERNIESpeed128K,
  ERNIESpeed8K: ERNIESpeed8K,
  ERNIELite8K0308: ERNIELite8K0308,
  ERNIELite8K0922: ERNIELite8K0922,
};
