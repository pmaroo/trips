"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTag = exports.createTag = exports.updateTag = exports.deleteTag = void 0;
const error_1 = require("../utils/error");
const tag_model_1 = require("../models/tag.model");
const deleteTag = async (req, res, next) => {
    const deleteData = req.body;
    try {
        if (!deleteData) {
            throw new Error("태그 정보가 없습니다.");
        }
        const verify = await (0, tag_model_1.getPlaceTagByIdModel)(deleteData);
        if (verify.length !== 0) {
            throw new Error("태그를 가지고 있는 장소가 있어 삭제가 불가합니다.");
        }
        const data = await (0, tag_model_1.deleteTagModel)(deleteData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "태그를 삭제하는데 실패했습니다.", { raw: error }));
    }
};
exports.deleteTag = deleteTag;
const updateTag = async (req, res, next) => {
    const { tagData } = req.body;
    try {
        if (!tagData) {
            throw new Error("태그 정보가 없습니다.");
        }
        const data = await (0, tag_model_1.updateTagModel)(tagData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "태그를 수정하는데 실패했습니다.", { raw: error }));
    }
};
exports.updateTag = updateTag;
const createTag = async (req, res, next) => {
    const { tagData } = req.body;
    try {
        if (!tagData) {
            throw new Error("태그 정보가 없습니다.");
        }
        const data = await (0, tag_model_1.createTagModel)(tagData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "태그를 생성하는데 실패했습니다.", { raw: error }));
    }
};
exports.createTag = createTag;
const getAllTag = async (req, res, next) => {
    try {
        const data = await (0, tag_model_1.getAllTagModel)();
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "태그를 불러오는데 실패했습니다.", { raw: error }));
    }
};
exports.getAllTag = getAllTag;
