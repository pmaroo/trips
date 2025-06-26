"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.naverInstance = void 0;
const axios = require("axios");
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
exports.naverInstance = axios.create({
    baseURL: "https://naveropenapi.apigw.ntruss.com/map-place/v1",
    headers: {
        "X-NCP-APIGW-API-KEY-ID": NAVER_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": NAVER_CLIENT_SECRET,
    },
});
