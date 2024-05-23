import { baiduFreeAiModels } from "./baidu";

// 导出所有模型
export const models = {
  ...baiduFreeAiModels,
};

export const modelsList: string[] = Object.keys(models);
