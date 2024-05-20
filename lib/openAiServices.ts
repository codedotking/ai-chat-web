import { ClientOptions, OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.SK_TOKEN,
  baseURL: process.env.BASE_URL,
});

export default openai;
