import prisma from "../config/db";
import { errorDTO } from "../types/error";

export async function logErrorToDB(error: errorDTO) {
  try {
    await prisma.error.create({
      data: {
        action: error.action,
        context: error.context,
        backCode: error.backCode,
        error: error.error,
        scope: error.scope,
      },
    });
  } catch (logErr) {
    console.error("에러로그 저장 실패", logErr);
  }
}
