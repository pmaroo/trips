"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const plan_controller_1 = require("../controllers/plan.controller");
const router = express_1.default.Router();
// 일정 삭제
router.post("/delete", plan_controller_1.deletePlan);
// 일정수정
router.post("/update", plan_controller_1.updatePlan);
// 일정생성
router.post("/create", plan_controller_1.createPlan);
// 일정상세
router.post("/id", plan_controller_1.getPlanById);
// 유저별 일정 구하기
router.post("/user", plan_controller_1.getPlanUserById);
// 일정리스트
router.post("/", plan_controller_1.getAllPlan);
exports.default = router;
