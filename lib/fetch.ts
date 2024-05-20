const fetchStream = () => {
  fetch("https://example.com/data")
    .then((response: Response) => {
      if (!response.body) {
        return;
      }
      // 获取 reader
      const reader = response.body.getReader();
      return new ReadableStream({
        start(controller) {
          const pump: any = async function () {
            const { done, value } = await reader.read();
            // When no more data needs to be consumed, close the stream
            if (done) {
              controller.close();
              return;
            }
            // Enqueue the next data chunk into our target stream
            controller.enqueue(value);
            return pump();
          };
          return pump();
        },
      });
    })
    .catch(console.error);
};
