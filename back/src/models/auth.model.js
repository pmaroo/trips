"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logErrorToDB = logErrorToDB;
const db_1 = __importDefault(require("../config/db"));
async function logErrorToDB(error) {
    try {
        await db_1.default.error.create({
            data: {
                action: error.action,
                context: error.context,
                backCode: error.backCode,
                error: error.error,
                scope: error.scope,
            },
        });
    }
    catch (logErr) {
        console.error("에러로그 저장 실패", logErr);
    }
}
