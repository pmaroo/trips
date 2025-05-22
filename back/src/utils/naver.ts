const axios = require("axios");

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

export const naverInstance = axios.create({
  baseURL: "https://naveropenapi.apigw.ntruss.com/map-place/v1",
  headers: {
    "X-NCP-APIGW-API-KEY-ID": NAVER_CLIENT_ID,
    "X-NCP-APIGW-API-KEY": NAVER_CLIENT_SECRET,
  },
});
