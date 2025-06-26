"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.errorConsole = void 0;
const errorConsole = (error) => {
    console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
    console.log(error);
    console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
};
exports.errorConsole = errorConsole;
class AppError extends Error {
    constructor(statusCode, message, meta) {
        super(message);
        this.statusCode = statusCode;
        this.meta = meta;
        this.name = "AppError";
    }
}
exports.AppError = AppError;
