import axios from "axios";
import {
  Coordinate,
  ItineraryInput,
  NaverPlaceDTO,
  Place,
} from "../types/logic";

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

const naverInstance = axios.create({
  baseURL: "https://naveropenapi.apigw.ntruss.com/map-place/v1",
  headers: {
    "X-NCP-APIGW-API-KEY-ID": NAVER_CLIENT_ID,
    "X-NCP-APIGW-API-KEY": NAVER_CLIENT_SECRET,
  },
});

// 특정 키워드(커플)와 기준 좌표를 기준으로 장소를 검색
// 정렬기준 : random or distance
async function searchPlaces(
  keyword: string,
  coord: Coordinate,
  radius = 1000
): Promise<Place[]> {
  const response = await naverInstance.get("/search", {
    params: {
      query: keyword, // ex. 커플 맛집, 데이트 명소 등
      coordinate: `${coord.lng},${coord.lat}`,
      radius,
      count: 10,
      sort: "random", // 또는 "distance"
    },
  });

  return response.data.places.map((place: NaverPlaceDTO) => ({
    name: place.name,
    lat: place.y,
    lng: place.x,
    category: keyword,
  }));
}

// 주어진 장소 목록을 기준 좌표로부터 가까운 순서로 정렬
function sortByDistance(origin: Coordinate, places: Place[]): Place[] {
  return places
    .map((place) => ({
      ...place,
      distance: getDistance(origin, { lat: place.lat, lng: place.lng }),
    }))
    .sort((a, b) => a.distance - b.distance);
}

// Haversine 공식
// 두 좌표 간의 거리(m)를 Haversine 공식을 이용해 계산
function getDistance(coord1: Coordinate, coord2: Coordinate): number {
  const R = 6371e3;
  const toRad = (deg: number) => deg * (Math.PI / 180);
  const φ1 = toRad(coord1.lat);
  const φ2 = toRad(coord2.lat);
  const Δλ = toRad(coord2.lng - coord1.lng);
  const Δφ = toRad(coord2.lat - coord1.lat);

  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// 네이버 지도 API를 통해 도보거리 계싼
// option : "trafast" 빠른 길 찾기 옵션
async function getWalkingDistance(
  start: Coordinate,
  end: Coordinate
): Promise<number> {
  const res = await axios.get(
    "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving",
    {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": NAVER_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": NAVER_CLIENT_SECRET,
      },
      params: {
        start: `${start.lng},${start.lat}`,
        goal: `${end.lng},${end.lat}`,
        option: "trafast",
      },
    }
  );
  const route = res.data.route?.trafast?.[0];
  return route?.summary?.distance || 0;
}

// 시작점을 기준으로 가장 가까운 장소부터 순차적으로 방문하는 TSP(Travelling Salesman Problem) 근사 알고리즘
// 알고리즘: Nearest Neighbor
function optimizeRoute(start: Place, spots: Place[]): Place[] {
  const route: Place[] = [start];
  let current = start;
  let remaining: Place[] = [...spots];

  while (remaining.length > 0) {
    remaining.sort((a, b) => getDistance(current, a) - getDistance(current, b));

    const next = remaining.shift();
    if (!next) break;

    route.push(next);
    current = next;
  }

  return route;
}

// 테스트 및 목업 용도로 임의의 가격을 생성하는 함수.
function mockPrice(name: string): number {
  return 30000 + name.length * 1000; // 단순 예시
}

// 숙소 키워드로 장소를 검색하고, 그 중 mockPrice를 기준으로 가격 필터링 후 랜덤으로 하나를 선택.
async function filterAccommodations(
  coord: Coordinate,
  minPrice: number,
  maxPrice: number
): Promise<Place> {
  const all = await searchPlaces("숙소", coord, 3000); // 반경 3km 예시

  const filtered = all.filter((p) => {
    const price = mockPrice(p.name); // DB 또는 제휴 API 연동 필요
    return price >= minPrice && price <= maxPrice;
  });

  return filtered[Math.floor(Math.random() * filtered.length)];
}

// 여행지 일정 자동 생성
export async function createItinerary(
  input: ItineraryInput
): Promise<{ day1: Place[] }> {
  const { start, destination, category, budget, dateRange } = input;

  // 1. 맛집 기준 장소 검색
  const restaurants = await searchPlaces(`${category} 맛집`, destination);
  const baseRestaurant = sortByDistance(start, restaurants)[0];

  // 2. 명소/카페 주변 필터링
  const attractions = await searchPlaces(`${category} 명소`, baseRestaurant);
  const cafes = await searchPlaces("카페", baseRestaurant);
  const sights = optimizeRoute(baseRestaurant, [...attractions, ...cafes]);

  // 3. 숙소 랜덤 배치
  const hotel = await filterAccommodations(destination, budget.min, budget.max);

  return {
    day1: [
      baseRestaurant,
      sights[0],
      sights[1],
      restaurants[1] || baseRestaurant,
      hotel,
    ],
  };
}
