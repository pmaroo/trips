"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTagModel = exports.getPlaceTagByIdModel = exports.createTagModel = exports.updateTagModel = exports.deleteTagModel = void 0;
const db_1 = __importDefault(require("../config/db"));
const deleteTagModel = async (data) => {
    console.log(data);
    return db_1.default.tag.delete({
        where: { id: data.id },
    });
};
exports.deleteTagModel = deleteTagModel;
const updateTagModel = async (data) => {
    return db_1.default.tag.update({
        where: { id: data.id },
        data,
    });
};
exports.updateTagModel = updateTagModel;
const createTagModel = async (data) => {
    return db_1.default.tag.create({
        data,
    });
};
exports.createTagModel = createTagModel;
const getPlaceTagByIdModel = async (data) => {
    return db_1.default.place.findMany({
        where: {
            Tag: {
                some: {
                    id: data.id,
                },
            },
        },
    });
};
exports.getPlaceTagByIdModel = getPlaceTagByIdModel;
const getAllTagModel = async () => {
    return db_1.default.tag.findMany({
        include: {
            Category: true,
            Place: true,
        },
    });
};
exports.getAllTagModel = getAllTagModel;
