import axios from "axios";
import { errorConsole } from "../utils/error";

interface Result {
  name: string;
  address: string;
  number: string;
  icon: string;
  iconBgColor: string;
  iconUrl: string;
  rating: number;
  placeId: string;
  reviews: [];
  servesBeer: boolean;
  servesBrunch: boolean;
  servesDinner: boolean;
  servesLunch: boolean;
  servesWine: boolean;
  takeout: string;
  url: string;
  userRatingsTotal: number;
  lat: number;
  lng: number;
  vicinity: string;
  distance?: number;
  duration?: number;
}

interface GooglePlace {
  placeId: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  rating?: number;
  user_ratings_total?: number;
}

interface PlaceDTO {
  lat: number;
  lng: number;
  radius: number;
  keyword: string;
}

interface DistnaceDTO {
  distance: number;
  duration: number;
  name: string;
}

// 근처 장소 리스트 구하기
// 최대 20개
async function getNearbyGooglePlaces(
  lat: number, //  경도
  lng: number, // 위도
  radius: number, // 범위
  keyword: string, // 검색키워드
  type: string, // 검색타입
  rendomIdx: number // 랜덤 수
): Promise<Result[]> {
  const baseUrl =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  let allPlaces: GooglePlace[] = [];

  const params: any = {
    location: `${lat},${lng}`,
    radius,
    keyword,
    key: apiKey,
    type,
    language: "ko",
  };

  const response = await axios.get(baseUrl, { params });

  if (response.data.status !== "OK") {
    console.warn(`Google API Warning: ${response.data.status}`);
    return [];
  }

  const foodPlaces = response.data.results.map((place: any) => ({
    placeId: place.place_id,
    name: place.name,
    lat: place.geometry.location.lat,
    lng: place.geometry.location.lng,
    address: place.vicinity,
    rating: place.rating,
    user_ratings_total: place.user_ratings_total,
  }));

  allPlaces = [...allPlaces, ...foodPlaces];

  // user_ratings_total이 1000 이상인 곳만 필터링 후, 최대 60개까지 반환
  // 음식점일때만 필터링
  const filterdPlaces =
    type === "restaurant"
      ? allPlaces
          .filter(
            (place) =>
              place.user_ratings_total && place.user_ratings_total >= 50
          )
          .slice(0, 20)
      : allPlaces;

  if (filterdPlaces.length === 0) {
    return [];
  } // 배열이 비어있으면 null 반환

  // 랜덤 숫자에 따라서 겹치지 않는 랜덤 수 뽑기
  function getTwoUniqueRandomIndices(max: number) {
    const indices = new Set<number>();
    while (indices.size < rendomIdx) {
      const rand = Math.floor(Math.random() * max);
      indices.add(rand);
    }
    return [...indices];
  }

  // 랜덤 수 필터링 된 리스트 내에서 돌리기
  const rendomIndex = getTwoUniqueRandomIndices(
    filterdPlaces.length
  ) as number[];

  // 최종 결과물 담을 곳
  let storeDatum: Result[] = [];

  // 뽑힌 랜덤 숫자만큼 데이터 가공
  for (let i = 0; i < rendomIndex.length; i++) {
    // 구글 장소 세부정보 불러오기
    const details = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: filterdPlaces[rendomIndex[i]].placeId,
          key: process.env.GOOGLE_MAPS_API_KEY,
          language: "ko",
          region: "kr",
        },
      }
    );

    await storeDatum.push({
      name: details.data.result.name,
      address: details.data.result.formatted_address,
      number: details.data.result.formatted_phone_number,
      icon: details.data.result.icon,
      iconBgColor: details.data.result.icon_background_color,
      iconUrl: details.data.result.icon_mask_base_uri,
      rating: details.data.result.rating,
      placeId: details.data.result.place_id,
      reviews: details.data.result.reviews,
      servesBeer: details.data.result.serves_beer,
      servesBrunch: details.data.result.serves_brunch,
      servesDinner: details.data.result.serves_dinner,
      servesLunch: details.data.result.serves_lunch,
      servesWine: details.data.result.serves_wine,
      takeout: details.data.result.takeout,
      url: details.data.result.url,
      userRatingsTotal: details.data.result.user_ratings_total,
      vicinity: details.data.result.vicinity,
      lat: details.data.result.geometry.location.lat,
      lng: details.data.result.geometry.location.lng,
    });
  }

  return storeDatum;
}

// 장소 간 거리 구하기
// 카카오보빌리티 일 10,000건
async function getDistance(
  startName: string | null,
  startLat: number,
  startLng: number,

  endName: string,
  endLat: number,
  endLng: number
) {
  const baseUrl = "https://apis-navi.kakaomobility.com/v1/directions";

  const params: any = {
    origin: startName
      ? `${startLng},${startLat},name=${startName}`
      : `${startLng},${startLat}`,
    destination: `${endLng},${endLat},name=${endName}`,
    priority: "RECOMMEND",
    roadevent: 2,
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
    name: endName, // 관광지명소
    distance: response.data.routes[0].summary.distance,
    duration: response.data.routes[0].summary.duration,
  };
}

//  가까운 거리순으로 배열 정리
async function arrayDistances(
  distances: DistnaceDTO[],
  touristPlaces: Result[] | null
) {
  let temp: (Result & DistnaceDTO)[] = [];

  if (touristPlaces) {
    // 이름이 일치하는 관광지에 거리 정보 병합
    touristPlaces.forEach((place) => {
      distances.forEach((dist) => {
        if (place.name === dist.name) {
          temp.push({ ...place, ...dist });
        }
      });
    });
  }

  // 가까운 거리순으로 정렬
  temp.sort((a, b) => a.distance - b.distance);

  return temp;
}

// 1일차
async function getFirstDay(
  touristAllSortDistance: Result[],
  originDate: number,
  destinationLat: number,
  destinationLng: number,
  firstTouristSortDistance: Result[]
) {
  let onePlace = null;
  let twoPlace = null;
  let threePlace = null;
  let fourPlace = null;
  let fivePlace = null;

  // 1박2일
  if (originDate === 2) {
    // 1일차 첫 음식점
    // 첫날 관광지 근처 음식점
    const firstFood = await getNearbyGooglePlaces(
      touristAllSortDistance[1].lat,
      touristAllSortDistance[1].lng,
      2000,
      "음식",
      "restaurant",
      1
    );
    // 1일차 첫 관광 = touristAllSortDistance[1]
    // 1일차 두번째 관광 = touristAllSortDistance[2]
    // 1일차 마지막 음식
    const nMiusFood = await getNearbyGooglePlaces(
      destinationLat,
      destinationLng,
      2000,
      "음식",
      "restaurant",
      1
    );
    // 1일차 숙소
    const nMiusStay = await getNearbyGooglePlaces(
      nMiusFood[0].lat,
      nMiusFood[0].lng,
      2000,
      "숙소",
      "lodging",
      1
    );

    onePlace = await firstFood[0];
    twoPlace = await touristAllSortDistance[1];
    threePlace = await touristAllSortDistance[2];
    fourPlace = await nMiusFood[0];
    fivePlace = await nMiusStay[0];
  } else {
    // N일차
    // 1일차 첫 음식점
    // 첫날 관광지 근처 음식점
    const firstFood = await getNearbyGooglePlaces(
      touristAllSortDistance[1].lat,
      touristAllSortDistance[1].lng,
      2000,
      "음식",
      "restaurant",
      1
    );
    // 1일차 첫 관광 = touristAllSortDistance[1]
    // 1일차 두번째 관광 = firstTouristSortDistance[0]
    // 1일차 마지막 음식점
    // 첫날 두번째 관광과 가장 가까운곳
    const day1LastFood = await getNearbyGooglePlaces(
      firstTouristSortDistance[0].lat,
      firstTouristSortDistance[0].lng,
      2000,
      "음식",
      "restaurant",
      1
    );

    // 1일차 마지막 숙소
    const day1LastStay = await getNearbyGooglePlaces(
      day1LastFood[0].lat,
      day1LastFood[0].lng,
      2000,
      "숙소",
      "lodging",
      1
    );

    onePlace = await firstFood[0];
    twoPlace = await touristAllSortDistance[1];
    threePlace = await firstTouristSortDistance[0];
    fourPlace = await day1LastFood[0];
    fivePlace = await day1LastStay[0];
  }

  return [onePlace, twoPlace, threePlace, fourPlace, fivePlace];
}

// n일차
async function getNDay(
  firstStayDistance: DistnaceDTO[],
  remainFirstStayDistance: Result[]
) {
  let onePlace = null;
  let twoPlace = null;
  let threePlace = null;
  let fourPlace = null;
  let fivePlace = null;
  let sixPlace = null;

  // 숙소와 가장 가까운 거리순으로 배열 정리
  // firstStaySortDistance[0] : n일째 첫 관광지
  // firstStaySortDistance[1] : n일째 두번째 관광지
  // firstStaySortDistance[2] : n일째 세번째 관광지
  const firstStaySortDistance: Result[] = await arrayDistances(
    firstStayDistance,
    remainFirstStayDistance
  );

  // n일째 첫 음식점 (n일째 첫 관광지 근처)
  const nFirstFood = await getNearbyGooglePlaces(
    firstStaySortDistance[0].lat,
    firstStaySortDistance[0].lng,
    2000,
    "음식",
    "restaurant",
    1
  );

  // 마지막 음식점
  const nLastFood = await getNearbyGooglePlaces(
    firstStaySortDistance[2].lat,
    firstStaySortDistance[2].lng,
    2000,
    "음식",
    "restaurant",
    1
  );

  // 숙소
  const nLastStay = await getNearbyGooglePlaces(
    nLastFood[0].lat,
    nLastFood[0].lng,
    2000,
    "숙소",
    "lodging",
    1
  );

  onePlace = await firstStaySortDistance[0];
  twoPlace = await nFirstFood[0];
  threePlace = await firstStaySortDistance[1];
  fourPlace = await firstStaySortDistance[2];
  fivePlace = await nLastFood[0];
  sixPlace = await nLastStay[0];

  return [onePlace, twoPlace, threePlace, fourPlace, fivePlace, sixPlace];
}

// n-1일차
async function getNMinusDay(
  destinationLat: number,
  destinationLng: number,
  remainFirstStayDistance: Result[],
  day1LastStay: Result // 전날숙소
) {
  let onePlace = null;
  let twoPlace = null;
  let threePlace = null;
  let fourPlace = null;
  let fivePlace = null;
  let sixPlace = null;

  // 남은 관광지 중 숙소와 가장 가까운 곳
  const firstStayDistance: DistnaceDTO[] = await Promise.all(
    remainFirstStayDistance.map((place) =>
      getDistance(
        day1LastStay.name,
        day1LastStay.lat,
        day1LastStay.lng,
        place.name,
        place.lat,
        place.lng
      )
    )
  );

  // 숙소와 가장 가까운 거리순으로 배열 정리
  // firstStaySortDistance[0] : n일째 첫 관광지
  // firstStaySortDistance[1] : n일째 두번째 관광지
  // firstStaySortDistance[2] : n일째 세번째 관광지
  const firstStaySortDistance: Result[] = await arrayDistances(
    firstStayDistance,
    remainFirstStayDistance
  );

  // n일째 첫 음식점 (n일째 첫 관광지 근처)
  const nFirstFood = await getNearbyGooglePlaces(
    firstStaySortDistance[0].lat,
    firstStaySortDistance[0].lng,
    2000,
    "음식",
    "restaurant",
    1
  );
  // N-1일차 핫플 근처 음식점
  const nMiusFood = await getNearbyGooglePlaces(
    destinationLat,
    destinationLng,
    2000,
    "음식",
    "restaurant",
    1
  );

  // N-1일차 숙소
  const nMiusStay = await getNearbyGooglePlaces(
    nMiusFood[0].lat,
    nMiusFood[0].lng,
    2000,
    "숙소",
    "lodging",
    1
  );

  onePlace = await firstStaySortDistance[0];
  twoPlace = await nFirstFood[0];
  threePlace = await firstStaySortDistance[1];
  fourPlace = await firstStaySortDistance[2];
  fivePlace = await nMiusFood[0];
  sixPlace = await nMiusStay[0];

  return [onePlace, twoPlace, threePlace, fourPlace, fivePlace, sixPlace];
}

// 마지막날
async function getLastDay(touristAllSortDistance: Result[]) {
  let onePlace = null;
  let twoPlace = null;

  // 마지막 관광지 = touristAllSortDistance[0]
  // 마지막 음식점
  const lastFood = await getNearbyGooglePlaces(
    touristAllSortDistance[0].lat,
    touristAllSortDistance[0].lng,
    2000,
    "음식",
    "restaurant",
    1
  );

  onePlace = await touristAllSortDistance[0];
  twoPlace = await lastFood[0];

  return [onePlace, twoPlace];
}

export async function logic(data: any) {
  // 일차별 최대 장소개수 6
  // 관광 - 음식점 - 관광 - 관광 - 음식점 - 숙소

  // #1박2일
  // 카카오모빌리티 : 6 ~ 8
  // 구글지도 : 8 ~ 10
  // 일정짜는속도 : 5초 이내

  // #2박3일
  // 카카오모빌리티 : 16 ~ 30
  // 구글지도 : 21 ~ 42
  // 일정짜는속도 : 7초 이내

  // #3박4일
  // 카카오모빌리티 : 28 ~ 40
  // 구글지도 : 29 ~ 50
  // 일정짜는속도 : 10초 이내

  // 카카오모빌리티 지표
  // https://developers.kakao.com/stats/app/1251460/quota

  // 구글지도 지표
  // https://console.cloud.google.com/apis/dashboard?inv=1&invt=Abyjyg&project=secret-helper-460706-b7&pageState=(%22duration%22:(%22groupValue%22:%22PT1H%22,%22customValue%22:null))

  // 출발장소 경도위도
  const originLat = data.start.lat;
  const originLng = data.start.lng;

  // 도착장소 경도위도
  const destinationLat = data.destination.lat;
  const destinationLng = data.destination.lng;

  // 여행 일정
  // ex ) 1박2일 = 2 , 2박3일 = 3
  // 실제 여행일정 일차
  const originDate = 2;
  const setDate = originDate - 2;

  // 관광지 뽑기
  // (3 + 3 * setDate)의 개수만큼 뽑기
  // n = originDate
  // N일 = 관광지 3 + (3 * (n - 2))
  const touristPlaces = await getNearbyGooglePlaces(
    35.16001944,
    129.1658083,
    10000,
    "관광명소",
    "establishment",
    3 + 3 * setDate
  );

  if (!touristPlaces?.length) {
    errorConsole("관광지 뽑기 실패 실패");
    return;
  }

  // 출발지로부터 모든 관광지 거리 계산을 병렬로 처리
  const touristAllDistances: DistnaceDTO[] = await Promise.all(
    touristPlaces.map((place) =>
      getDistance(null, originLat, originLng, place.name, place.lat, place.lng)
    )
  );

  if (!touristAllDistances?.[0]) {
    errorConsole("거리계산에서 실패");
    return;
  }

  //  모든 관광지 가까운 거리순으로 배열 정리
  // touristAllSortDistance[0] = 마지막날 관광지
  // touristAllSortDistance[1] = 첫날 관광지
  const touristAllSortDistance: Result[] = await arrayDistances(
    touristAllDistances,
    touristPlaces
  );

  if (touristAllSortDistance.length < 3) {
    errorConsole("배열 정리 실패");
    return;
  }
  // 첫날 관광지, 마지막관광지 삭제한 배열
  // N일차일때만 length가 1보다 큼
  // splice는 원본 배열을 건드림
  const remainFirstTouristSortDistance: Result[] =
    await touristAllSortDistance.slice(2);

  // 첫날 관광지와 가장 가까운 곳
  const firstTouristDistances: any[] = await Promise.all(
    remainFirstTouristSortDistance.map((place) =>
      getDistance(
        touristAllSortDistance[1].name,
        touristAllSortDistance[1].lat,
        touristAllSortDistance[1].lng,
        place.name,
        place.lat,
        place.lng
      )
    )
  );

  // 첫날 관광지와 가까운 거리순으로 배열 정리
  // firstTouristSortDistance[0] : 첫날 두번째 관광
  const firstTouristSortDistance: Result[] = await arrayDistances(
    firstTouristDistances,
    touristPlaces
  );

  // 최종 일정 담을 곳
  let days = [];

  // 1일차 구하기
  const firstDay = await getFirstDay(
    touristAllSortDistance,
    originDate,
    destinationLat,
    destinationLng,
    firstTouristSortDistance
  );

  // 1일차 추가
  await days.push(firstDay);

  // 2박 3일부터
  if (firstTouristSortDistance.length > 1) {
    console.log("여기는 1박 2일은 나오면 안됨");

    // 첫날 두번째 관광지 제외한 배열
    const remainFirstStayDistance: Result[] =
      await firstTouristSortDistance.slice(1);

    // 남은 관광지 중 숙소와 가장 가까운 곳
    let firstStayDistance: DistnaceDTO[] = await Promise.all(
      remainFirstStayDistance.map((place) =>
        getDistance(
          firstDay[4].name,
          firstDay[4].lat,
          firstDay[4].lng,
          place.name,
          place.lat,
          place.lng
        )
      )
    );

    if (firstStayDistance.length / 3 > 1) {
      // 3박4일
      // 1일차 - n일차 - n-1일차 - 마지막
      // N일차 구하기
      const nDay = await getNDay(firstStayDistance, remainFirstStayDistance);

      // n일차 추가
      await days.push(nDay);

      // 남은 관광지 / 3(N일차 하루 필요 관광지 3) - 1(2일차) - 1(n-1일차)
      if (firstStayDistance.length / 3 - 2 > 0) {
        // 4박5일부터
        // 1일차 - n일차 - ... - n-1일차 - 마지막
        for (let i = 0; i < firstStayDistance.length / 3 - 2; i++) {
          // 남은 관광지 중 숙소와 가장 가까운 곳
          firstStayDistance = await Promise.all(
            remainFirstStayDistance.map((place) =>
              getDistance(
                nDay[5].name,
                nDay[5].lat,
                nDay[5].lng,
                place.name,
                place.lat,
                place.lng
              )
            )
          );

          // N일차 구하기
          const nDays = await getNDay(
            firstStayDistance,
            remainFirstStayDistance
          );

          // n일차 추가
          await days.push(nDays);
        }
      }
      // n-1일차 구하기
      const nMinusDay = await getNMinusDay(
        destinationLat,
        destinationLng,
        remainFirstStayDistance,
        nDay[5]
      );

      // n일차 추가
      await days.push(nMinusDay);
    } else {
      // 2박 3일
      // 1일차 - n-1일차 - 마지막
      // n-1일차 구하기
      const nMinusDay = await getNMinusDay(
        destinationLat,
        destinationLng,
        remainFirstStayDistance,
        firstDay[4]
      );

      // n일차 추가
      await days.push(nMinusDay);
    }
  }

  // 마지막 구하기
  const lastDay = await getLastDay(touristAllSortDistance);

  // 마지막 추가
  await days.push(lastDay);

  const result = {
    ...data,
    days,
  };

  return result;
}
