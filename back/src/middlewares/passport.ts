import { NextFunction, Request, Response } from "express";

export const isAmdin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.jwtUser;

  if (user && user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "접근 권한이 없습니다." });
  }
};

export const isLoggedin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.jwtUser;

  if (user) {
    next();
  } else {
    res.status(403).json({ message: "회원만 이용 가능합니다." });
  }
};
