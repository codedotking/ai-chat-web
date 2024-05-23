import { NextRequest } from "next/server";
import { models } from "@/models";

const POST = async (req: NextRequest) => {
  const params = await req.json();
  return await models.ERNIESpeed128K.chat(params);
};

export { POST };
