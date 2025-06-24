export const errorConsole = (error: any) => {
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  console.log(error);
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
};

export class AppError extends Error {
  constructor(public statusCode: number, message: string, public meta?: any) {
    super(message);
    this.name = "AppError";
  }
}
