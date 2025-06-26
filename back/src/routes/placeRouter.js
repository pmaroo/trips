"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const plcae_controller_1 = require("../controllers/plcae.controller");
const router = express_1.default.Router();
// 장소 태그 추가
router.post("/tag", plcae_controller_1.createTagPlus);
// 장소 삭제
router.post("/delete", plcae_controller_1.deletePlace);
// 장소수정
router.post("/update", plcae_controller_1.updatePlace);
// 장소생성
router.post("/create", plcae_controller_1.createPlace);
// 장소리스트
router.post("/", plcae_controller_1.getAllPlace);
exports.default = router;
