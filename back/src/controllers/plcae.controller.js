"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlace = exports.createPlace = exports.updatePlace = exports.deletePlace = exports.createTagPlus = void 0;
const error_1 = require("../utils/error");
const place_model_1 = require("../models/place.model");
const createTagPlus = async (req, res, next) => {
    const { placeData } = req.body;
    try {
        if (!placeData) {
            throw new Error("장소 정보가 없습니다.");
        }
        const data = await (0, place_model_1.updatePlaceTagModel)(placeData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "태그를 추가하는데 실패했습니다.", { raw: error }));
    }
};
exports.createTagPlus = createTagPlus;
const deletePlace = async (req, res, next) => {
    const deleteData = req.body;
    try {
        if (!deleteData) {
            throw new Error("장소 정보가 없습니다.");
        }
        const data = await (0, place_model_1.deletePlaceModel)(deleteData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "태그를 삭제에 실패했습니다.", { raw: error }));
    }
};
exports.deletePlace = deletePlace;
const updatePlace = async (req, res, next) => {
    var _a;
    const { placeData } = req.body;
    try {
        if (!placeData) {
            throw new Error("장소 정보가 없습니다.");
        }
        const result = {
            ...placeData,
            Tag: {
                connect: (_a = placeData.Tag) === null || _a === void 0 ? void 0 : _a.map((tag) => tag),
            },
        };
        const data = await (0, place_model_1.updatePlaceModel)(result);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "태그를 수정에 실패했습니다.", { raw: error }));
    }
};
exports.updatePlace = updatePlace;
const createPlace = async (req, res, next) => {
    const { placeData } = req.body;
    try {
        if (!placeData) {
            throw new Error("장소 정보가 없습니다.");
        }
        const result = {
            ...placeData,
            Tag: {
                connect: placeData.Tag,
            },
        };
        const data = await (0, place_model_1.createPlaceModel)(result);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "태그를 생성에 실패했습니다.", { raw: error }));
    }
};
exports.createPlace = createPlace;
const getAllPlace = async (req, res, next) => {
    try {
        const data = await (0, place_model_1.getAllPlaceModel)();
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "태그를 불러오는데 실패했습니다.", { raw: error }));
    }
};
exports.getAllPlace = getAllPlace;
