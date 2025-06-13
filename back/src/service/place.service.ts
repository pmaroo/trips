import axios from "axios";
import { CreatePlan } from "../types/plan";
import { errorConsole } from "../utils/error";

async function getDistance(
  startName: string | null,
  startLat: string,
  startLng: string,

  endName: string,
  endLat: string,
  endLng: string
) {
  const baseUrl = "https://apis-navi.kakaomobility.com/v1/directions";

  const params: any = {
    origin: startName
      ? `${startLng},${startLat},name=${startName}`
      : `${startLng},${startLat}`,
    destination: `${endLng},${endLat},name=${endName}`,
    priority: "TIME",
    roadevent: 0,
  };

  const response = await axios.get(baseUrl, {
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

export async function updateDataLogic(data: CreatePlan): Promise<CreatePlan> {
  // 최종 그릇
  let result: CreatePlan = data;

  // 1. 추가된 일정이 몇번째 days에 있는지
  const plusDaysIndexs: any[] = [];
  // 2. days안에 몇번째에 위치하는지
  const plusPlaceIndexs: any[] = [];

  for (let i = 0; i < data.days.length; i++) {
    data.days[i].map((value, index) => {
      if (value.status === 1) {
        if (!plusDaysIndexs.includes(i)) {
          plusDaysIndexs.push(i);
        }
        plusPlaceIndexs.push(index);
      }
    });
  }

  // 3. 기존 장소 => 추가된 장소로 가는 정보
  const newDays = await Promise.all(
    plusDaysIndexs.map(async (day, dayIndex) => {
      return await Promise.all(
        plusPlaceIndexs.map(async (value) => {
          const prev =
            // 출발지점
            value === 0 && day === 0
              ? {
                  ...data.days[day][value - 1],
                  place_name: data.start.name,
                  y: String(data.start.lat),
                  x: String(data.start.lng),
                }
              : value === 0
              ? data.days[day - 1][data.days[day - 1].length - 1]
              : data.days[day][value - 1];
          const place = data.days[day][value];

          const { distance, duration } = await getDistance(
            prev.place_name,
            prev.y,
            prev.x,
            place.place_name,
            place.y,
            place.x
          );

          return {
            ...value,
            distance,
            duration,
          };
        })
      );
    })
  );

  const kakaoApiKey = process.env.KAKAO_REST_API;

  for (const i of plusDaysIndexs) {
    for (let o = 0; o < plusPlaceIndexs.length; o++) {
      const imageRes = await axios.get(
        "https://dapi.kakao.com/v2/search/image",
        {
          params: {
            query: result.days[i][plusPlaceIndexs[o]].place_name,
            sort: "accuracy", // 정확도순
            size: 1,
          },
          headers: {
            Authorization: `KakaoAK ${kakaoApiKey}`,
          },
        }
      );

      result.days[i][plusPlaceIndexs[o]] = {
        ...result.days[i][plusPlaceIndexs[o]],
        ...newDays[0][o],
        ...imageRes.data.documents[0],
        status: 0,
      };
    }
  }

  // // 3. 추가된 장소 => 다음 장소로 가는 정보
  const newDays2 = await Promise.all(
    plusDaysIndexs.map(async (day, dayIndex) => {
      return await Promise.all(
        plusPlaceIndexs.map(async (value) => {
          if (
            value + 1 > data.days[day].length - 1 ||
            data.days[day][value + 1].status === 1
          )
            return value;

          const next = data.days[day][value + 1];
          const place = data.days[day][value];

          const { distance, duration } = await getDistance(
            place.place_name,
            place.y,
            place.x,
            next.place_name,
            next.y,
            next.x
          );

          return {
            ...value,
            distance,
            duration,
          };
        })
      );
    })
  );

  for (const i of plusDaysIndexs) {
    for (let o = 0; o < plusPlaceIndexs.length; o++) {
      if (parseInt(plusPlaceIndexs[o]) + 1 >= result.days[i].length)
        return result;

      result.days[i][parseInt(plusPlaceIndexs[o]) + 1] = {
        ...result.days[i][parseInt(plusPlaceIndexs[o]) + 1],
        ...newDays2[0][o],
      };
    }
  }

  // 4. N일차 마지막 장소가 변경된다면 N+1일차 첫날 거리 구하기
  let isLast = false;
  // 마지막 장소인지 판별
  for (const i of plusDaysIndexs) {
    for (const o of plusPlaceIndexs) {
      // N일차 마지막 장소이면서, N일차가 마지막일차가 아닐때
      if (data.days[i].length - 1 === o && data.days.length - 1 !== i) {
        isLast = true;
      }
    }
  }

  return result;
}

export async function findPlaceKakao(data: any) {
  const apiKey = process.env.KAKAO_REST_API;

  if (!data.keyword || !apiKey) {
    console.error("Missing keyword or API key");
    return [];
  }

  try {
    const res = await axios.get(
      "https://dapi.kakao.com/v2/local/search/keyword.json",
      {
        params: {
          query: data.keyword,
          size: 15,
        },
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      }
    );

    return res.data.documents;
  } catch (error: any) {
    console.error("Kakao API Error:", error?.response?.data || error.message);
    return [];
  }
}
