/**
 * 解析 SSE 数据
 * @param {string} message - SSE 数据字符串
 * @returns {Array} - 解析后的事件数组，每个事件包含 event 和 data 字段
 */
function parseSSE(message: string): {
  event: string;
  data: string;
} {



  console.log(`message = ${message}`);
  

  const lines = message.split("\n");
  let event = "";
  let data = "";
  lines.forEach((line) => {
    if (line.startsWith("event: ")) {
      event = line.replace("event: ", "");
    } else if (line.startsWith("data: ")) {
      data = line.replace("data: ", "");
    } else {
      // 忽略其他字段
    }
  });
  return { event, data };
}

export { parseSSE };
