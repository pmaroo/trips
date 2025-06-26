"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logic_controller_1 = require("../controllers/logic.controller");
const router = express_1.default.Router();
// 일정 수정하기
router.post("/update", logic_controller_1.updatePlan);
// 장소 찾기
router.post("/find/place", logic_controller_1.findPlace);
// 일정 저장하기
router.post("/find", logic_controller_1.findLogic);
exports.default = router;
