import app from "./src/app";
import dotenv from "dotenv";
// import "./src/types/express";

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중 - [${process.env.NODE_ENV}] 모드`);
});
