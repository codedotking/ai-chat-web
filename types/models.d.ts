interface AiModel {
    name: string;
    chat: (params: object) => Promise<Response>;
  }
  