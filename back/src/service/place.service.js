"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDataLogic = updateDataLogic;
exports.findPlaceKakao = findPlaceKakao;
const axios_1 = __importDefault(require("axios"));
async function getDistance(startName, startLat, startLng, endName, endLat, endLng) {
    const baseUrl = "https://apis-navi.kakaomobility.com/v1/directions";
    const params = {
        origin: startName
            ? `${startLng},${startLat},name=${startName}`
            : `${startLng},${startLat}`,
        destination: `${endLng},${endLat},name=${endName}`,
        priority: "TIME",
        roadevent: 0,
    };
    const response = await axios_1.default.get(baseUrl, {
        headers: {
            Authorization: `KakaoAK ${process.env.KAKAO_REST_API}`,
            "Content-Type": "application/json",
        },
        params,
    });
    if (!response.data.routes || !response.data.routes[0]) {
        console.log("유효한 경로를 찾을 수 없습니다.");
    }
    if (!response.data.routes[0].summary) {
        console.log("거리가 안나옴 여기에요!");
    }
    return {
        place_name: endName, // 관광지명소
        distance: response.data.routes[0].summary
            ? response.data.routes[0].summary.distance
            : 0,
        duration: response.data.routes[0].summary
            ? response.data.routes[0].summary.duration
            : 0,
    };
}
async function updateDataLogic(data) {
    // 최종 그릇
    let result = data;
    // status가 1인 datum
    const status = [];
    // status가 1인 data담기
    for (let i = 0; i < data.days.length; i++) {
        data.days[i].map((value, index) => {
            if (value.status === 1) {
                status.push({ parent: i, children: index });
            }
        });
    }
    // 3. 기존 장소 => 추가된 장소로 가는 정보
    const newDays = await Promise.all(status.map(async (value) => {
        // 출발지점이면 그대로 내보내기
        if (value.parent === 0 && value.children === 0)
            return {
                ...value,
            };
        const prev = 
        // children === 0이라면 최소 parent > 0
        value.children === 0
            ? // 전날 마지막지점에서 구하기
                data.days[value.parent - 1][data.days[value.parent - 1].length - 1]
            : data.days[value.parent][value.children - 1];
        const place = data.days[value.parent][value.children];
        const { distance, duration } = await getDistance(prev.place_name, prev.y, prev.x, place.place_name, place.y, place.x);
        return {
            ...value,
            distance,
            duration,
        };
    }));
    const kakaoApiKey = process.env.KAKAO_REST_API;
    for (const i of newDays) {
        const imageRes = await axios_1.default.get("https://dapi.kakao.com/v2/search/image", {
            params: {
                query: result.days[i.parent][i.children].place_name,
                sort: "accuracy", // 정확도순
                size: 1,
            },
            headers: {
                Authorization: `KakaoAK ${kakaoApiKey}`,
            },
        });
        result.days[i.parent][i.children] = {
            ...result.days[i.parent][i.children],
            ...i,
            ...imageRes.data.documents[0],
            status: 0,
        };
    }
    // 3. 추가된 장소 => 다음 장소로 가는 정보
    const newDays2 = await Promise.all(status.map(async (value) => {
        // 다음 장소가 새로운 장소거나
        // 다음 장소가 없을때
        if (value.children + 1 >= data.days[value.parent].length ||
            data.days[value.parent][value.children + 1].status === 1)
            return {
                ...value,
            };
        const next = data.days[value.parent][value.children + 1];
        const place = data.days[value.parent][value.children];
        const { distance, duration } = await getDistance(place.place_name, place.y, place.x, next.place_name, next.y, next.x);
        return {
            ...value,
            distance,
            duration,
        };
    }));
    for (const i of newDays2) {
        if (i.children + 1 === result.days[i.parent].length)
            return result;
        result.days[i.parent][i.children + 1] = {
            ...result.days[i.parent][i.children + 1],
            ...i,
            status: 0,
        };
    }
    return result;
}
async function findPlaceKakao(data) {
    var _a;
    const apiKey = process.env.KAKAO_REST_API;
    if (!data.keyword || !apiKey) {
        console.error("Missing keyword or API key");
        return [];
    }
    try {
        const res = await axios_1.default.get("https://dapi.kakao.com/v2/local/search/keyword.json", {
            params: {
                query: data.keyword,
                size: 15,
            },
            headers: {
                Authorization: `KakaoAK ${apiKey}`,
            },
        });
        return res.data.documents;
    }
    catch (error) {
        console.error("Kakao API Error:", ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        return [];
    }
}
