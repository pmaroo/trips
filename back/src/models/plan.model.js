"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlanModel = exports.getPlanByIdModel = exports.getPlacePlanByIdModel = exports.getPlanUserByIdModel = exports.createPlanModel = exports.updatePlanModel = exports.deletePlanModel = void 0;
const db_1 = __importDefault(require("../config/db"));
const deletePlanModel = async (data) => {
    return db_1.default.plan.delete({
        where: { id: data.id },
    });
};
exports.deletePlanModel = deletePlanModel;
const updatePlanModel = async (data) => {
    const destination = {
        lat: data.destination.lat,
        lng: data.destination.lng,
        name: data.destination.name,
    };
    const start = {
        lat: data.start.lat,
        lng: data.start.lng,
        name: data.start.name,
    };
    const date = data.date.map((value) => ({
        ...value,
    }));
    const days = data.days.map((dayArray) => dayArray.map((place) => ({ ...place })));
    return db_1.default.plan.update({
        where: { id: data.id },
        data: {
            UserId: 1,
            CategoryId: data.CategoryId,
            destination,
            start,
            date,
            days,
            originDate: data.originDate,
            traffic: data.traffic,
            category: data.category,
        },
    });
};
exports.updatePlanModel = updatePlanModel;
const createPlanModel = async (data) => {
    const destination = {
        lat: data.destination.lat,
        lng: data.destination.lng,
        name: data.destination.name,
    };
    const start = {
        lat: data.start.lat,
        lng: data.start.lng,
        name: data.start.name,
    };
    const date = data.date.map((value) => ({
        ...value,
    }));
    const days = data.days.map((dayArray) => dayArray.map((place) => ({ ...place })));
    return db_1.default.plan.create({
        data: {
            UserId: data.UserId,
            CategoryId: data.CategoryId,
            destination,
            start,
            date,
            days,
            originDate: data.originDate,
            traffic: data.traffic,
            category: data.category,
        },
    });
};
exports.createPlanModel = createPlanModel;
const getPlanUserByIdModel = async (data) => {
    return db_1.default.plan.findMany({
        where: { UserId: data.id },
        include: {
            Place: true,
            User: true,
            Category: true,
        },
    });
};
exports.getPlanUserByIdModel = getPlanUserByIdModel;
const getPlacePlanByIdModel = async (data) => {
    return db_1.default.place.findMany({
        where: { id: data.id },
    });
};
exports.getPlacePlanByIdModel = getPlacePlanByIdModel;
const getPlanByIdModel = async (data) => {
    return db_1.default.plan.findUnique({
        where: { id: data.id },
        include: {
            Place: true,
            User: true,
            Category: true,
        },
    });
};
exports.getPlanByIdModel = getPlanByIdModel;
const getAllPlanModel = async () => {
    return db_1.default.plan.findMany({
        include: {
            Place: true,
            User: true,
            Category: true,
        },
    });
};
exports.getAllPlanModel = getAllPlanModel;
