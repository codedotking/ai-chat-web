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
