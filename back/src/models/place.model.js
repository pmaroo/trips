"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlaceModel = exports.createPlaceModel = exports.updatePlaceModel = exports.updatePlaceTagModel = exports.deletePlaceModel = void 0;
const db_1 = __importDefault(require("../config/db"));
const deletePlaceModel = async (data) => {
    return db_1.default.place.delete({
        where: { id: data.id },
    });
};
exports.deletePlaceModel = deletePlaceModel;
const updatePlaceTagModel = async (placeData) => {
    const tags = placeData.Tag.map((value) => value.tag);
    return db_1.default.place.update({
        where: { id: placeData.id },
        data: {
            Tag: {
                connect: tags.map((tag) => ({ tag })), // tag 필드는 unique이므로 가능
            },
        },
    });
};
exports.updatePlaceTagModel = updatePlaceTagModel;
const updatePlaceModel = async (data) => {
    return db_1.default.place.update({
        where: { id: data.id },
        data,
    });
};
exports.updatePlaceModel = updatePlaceModel;
const createPlaceModel = async (data) => {
    return db_1.default.place.create({
        data,
    });
};
exports.createPlaceModel = createPlaceModel;
const getAllPlaceModel = async () => {
    return db_1.default.place.findMany({
        include: {
            Tag: true,
            Plan: true,
        },
    });
};
exports.getAllPlaceModel = getAllPlaceModel;
