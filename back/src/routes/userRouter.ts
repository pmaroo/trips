import express, { Request, Response } from "express";
import prisma from "../middlewares/client";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: { userName: "aa" },
    });
    console.log(users);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "에러" });
  }
});

export default router;
