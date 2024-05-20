const fetchEventSource = (
  url: string | URL | Request,
  options: RequestInit & {
    onopen?: () => void;
    onmessage?: (data: string) => void;
    onerror?: (error: any) => void;
    onclose?: () => void;
  }
) => {
  fetch(url, options)
    .then((response) => {
      if (response.status === 200) {
        options.onopen && options.onopen();
        return response.body;
      }
    })
    .then((rb: ReadableStream<Uint8Array> | null | undefined) => {
      if (!rb) {
        return;
      }
      const reader = rb.getReader();
      const push: any = async () => {
        // done 为数据流是否接收完成，boolean
        // value 为返回数据，Uint8Array
        const { done, value } = await reader.read();
        if (done) {
          options.onclose && options.onclose();
          return;
        }
        options.onmessage && options.onmessage(new TextDecoder().decode(value));
        return push();
      };
      // 开始读取流信息
      return push();
    })
    .catch((e) => {
      options.onerror && options.onerror(e);
    });
};

export { fetchEventSource };
