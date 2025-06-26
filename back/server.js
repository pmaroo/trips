"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const dotenv_1 = __importDefault(require("dotenv"));
// import "./src/types/express";
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`🚀 서버 실행 중 - [${process.env.NODE_ENV}] 모드`);
});
