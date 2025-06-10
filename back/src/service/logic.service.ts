import axios from "axios";
import { errorConsole } from "../utils/error";

interface KakaoResult {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string; // 중심좌표까지의 거리
  id: string; // 장소ID
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string; // 도로명주소
  x: string;
  y: string;
  startDistance?: number; // 출발지점에서 거리
  duration?: number;
  name?: string;
  collection?: string;
  thumbnail_url: string;
  image_url: string;
  width?: number;
  height?: number;
  display_stiename?: string;
  doc_url?: string;
  datetime?: Date;
}

interface DistnaceDTO {
  distance: number;
  duration: number;
  name: string;
}

// 근처 장소 리스트 구하기
// 최대 20개
async function getKakaoKeywordSearch(
  lat: string, //  경도
  lng: string, // 위도
  radius: number, // 범위
  category: string, // 카카오 카테고리
  keyword: string, // 검색키워드 (편행카테고리)
  rendomIdx: number // 랜덤 수
): Promise<KakaoResult[]> {
  let allPlaces: KakaoResult[] = [];

  const kakaoApiKey = process.env.KAKAO_REST_API;

  const kakaoParams: any = {
    x: lng,
    y: lat,
    radius,
    query: keyword,
    category_group_code: category,
  };

  const response = await axios.get(
    "https://dapi.kakao.com/v2/local/search/keyword.json",
    {
      params: kakaoParams,
      headers: {
        Authorization: `KakaoAK ${kakaoApiKey}`,
      },
    }
  );

  console.log(response.data.documents);

  if (response.data.documents.length === 0) {
    console.log("막혔음");
    return [];
  }

  // 카카오에서 준 정보 그대로 저장
  allPlaces = [...response.data.documents];

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
  const rendomIndex = (await getTwoUniqueRandomIndices(
    allPlaces.length
  )) as number[];

  // 최종 결과물 담을 곳
  let storeDatum: KakaoResult[] = [];

  // 뽑힌 랜덤 숫자만큼 데이터 가공

  for (let i = 0; i < rendomIndex.length; i++) {
    console.log(allPlaces[rendomIndex[i]].place_name);
    const imageRes = await axios.get("https://dapi.kakao.com/v2/search/image", {
      params: {
        query: allPlaces[rendomIndex[i]].place_name,
        sort: "accuracy", // 정확도순
        size: 1,
      },
      headers: {
        Authorization: `KakaoAK ${kakaoApiKey}`,
      },
    });

    console.log(imageRes);

    storeDatum.push({ ...allPlaces[i], ...imageRes.data.documents[0] });
  }

  return storeDatum;
}

// 장소 간 거리 구하기
// 카카오보빌리티 일 10,000건
// 차량일때만
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
    name: endName, // 관광지명소
    distance: response.data.routes[0].summary
      ? response.data.routes[0].summary.distance
      : 0,
    duration: response.data.routes[0].summary
      ? response.data.routes[0].summary.duration
      : 0,
  };
}

//  가까운 거리순으로 배열 정리
async function arrayDistances(
  distances: DistnaceDTO[],
  touristPlaces: KakaoResult[] | null
) {
  let temp: KakaoResult[] = [];

  if (touristPlaces) {
    // 이름이 일치하는 관광지에 거리 정보 병합
    touristPlaces.forEach((place) => {
      distances.forEach((dist) => {
        if (place.place_name === dist.name) {
          temp.push({
            ...place,
            startDistance: dist.distance,
            duration: dist.duration,
            name: dist.name,
          });
        }
      });
    });
  }

  // 가까운 거리순으로 정렬
  temp.sort((a, b) =>
    a.startDistance && b.startDistance ? a.startDistance - b.startDistance : 0
  );

  return temp;
}

// 1일차
async function getFirstDay(
  touristAllSortDistance: KakaoResult[],
  originDate: number,
  destinationLat: string,
  destinationLng: string,
  firstTouristSortDistance: KakaoResult[],
  originLat: string,
  originLng: string,
  category: string
) {
  // 장소
  let onePlace = null;
  let twoPlace = null;
  let threePlace = null;
  let fourPlace = null;
  let fivePlace = null;
  // 거리
  let oneDistance = null;
  let twoDistance = null;
  let threeDistance = null;
  let fourDistance = null;
  let fiveDistance = null;

  // 1박2일
  if (originDate === 2) {
    // 1일차 첫 음식점
    // 첫날 관광지 근처 음식점
    const firstFood = await getKakaoKeywordSearch(
      touristAllSortDistance[1].y,
      touristAllSortDistance[1].x,
      2000,
      "FD6", // 음식점
      category,
      1
    );

    console.log(firstFood);

    // oneDistance = await getDistance(
    //   null,
    //   originLat,
    //   originLng,
    //   firstFood[0].place_name,
    //   firstFood[0].y,
    //   firstFood[0].x
    // );

    // // 1일차 첫 관광 = touristAllSortDistance[1]
    // twoDistance = await getDistance(
    //   firstFood[0].place_name,
    //   firstFood[0].y,
    //   firstFood[0].x,
    //   touristAllSortDistance[1].place_name,
    //   touristAllSortDistance[1].y,
    //   touristAllSortDistance[1].x
    // );

    // // 1일차 두번째 관광 = touristAllSortDistance[2]
    // threeDistance = await getDistance(
    //   touristAllSortDistance[1].place_name,
    //   touristAllSortDistance[1].y,
    //   touristAllSortDistance[1].x,
    //   touristAllSortDistance[2].place_name,
    //   touristAllSortDistance[2].y,
    //   touristAllSortDistance[2].x
    // );

    // // 1일차 마지막 음식
    // const nMiusFood = await getKakaoKeywordSearch(
    //   destinationLat,
    //   destinationLng,
    //   2000,
    //   "FD6", // 음식점
    //   category,
    //   1
    // );

    // fourDistance = await getDistance(
    //   touristAllSortDistance[2].place_name,
    //   touristAllSortDistance[2].y,
    //   touristAllSortDistance[2].x,
    //   nMiusFood[0].place_name,
    //   nMiusFood[0].y,
    //   nMiusFood[0].x
    // );

    // // 1일차 숙소
    // const nMiusStay = await getKakaoKeywordSearch(
    //   nMiusFood[0].y,
    //   nMiusFood[0].x,
    //   2000,
    //   "AD5", // 숙박
    //   category,
    //   1
    // );

    // fiveDistance = await getDistance(
    //   nMiusFood[0].place_name,
    //   nMiusFood[0].y,
    //   nMiusFood[0].x,
    //   nMiusStay[0].place_name,
    //   nMiusStay[0].y,
    //   nMiusStay[0].x
    // );

    // onePlace = await {
    //   ...firstFood[0],
    //   distance: oneDistance.distance,
    //   duration: oneDistance.duration,
    // };
    // twoPlace = await {
    //   ...touristAllSortDistance[1],
    //   distance: twoDistance.distance,
    //   duration: twoDistance.duration,
    // };
    // threePlace = await {
    //   ...touristAllSortDistance[2],
    //   distance: threeDistance.distance,
    //   duration: threeDistance.duration,
    // };
    // fourPlace = await {
    //   ...nMiusFood[0],
    //   distance: fourDistance.distance,
    //   duration: fourDistance.duration,
    // };
    // fivePlace = await {
    //   ...nMiusStay[0],
    //   distance: fiveDistance.distance,
    //   duration: fiveDistance.duration,
    // };
  } else {
    // N일차
    // 1일차 첫 음식점
    // 첫날 관광지 근처 음식점
    const firstFood = await getKakaoKeywordSearch(
      touristAllSortDistance[1].y,
      touristAllSortDistance[1].x,
      2000,
      "FD6", // 음식점
      category,
      1
    );

    oneDistance = await getDistance(
      null,
      originLat,
      originLng,
      firstFood[0].place_name,
      firstFood[0].y,
      firstFood[0].x
    );
    // 1일차 첫 관광 = touristAllSortDistance[1]
    twoDistance = await getDistance(
      firstFood[0].place_name,
      firstFood[0].y,
      firstFood[0].x,
      touristAllSortDistance[1].place_name,
      touristAllSortDistance[1].y,
      touristAllSortDistance[1].x
    );
    // 1일차 두번째 관광 = firstTouristSortDistance[0]
    threeDistance = await getDistance(
      firstTouristSortDistance[0].place_name,
      firstTouristSortDistance[0].y,
      firstTouristSortDistance[0].x,
      touristAllSortDistance[2].place_name,
      touristAllSortDistance[2].y,
      touristAllSortDistance[2].x
    );

    // 1일차 마지막 음식점
    // 첫날 두번째 관광과 가장 가까운곳
    const day1LastFood = await getKakaoKeywordSearch(
      firstTouristSortDistance[0].y,
      firstTouristSortDistance[0].x,
      2000,
      "FD6", // 음식점
      category,
      1
    );

    fourDistance = await getDistance(
      firstTouristSortDistance[0].place_name,
      firstTouristSortDistance[0].y,
      firstTouristSortDistance[0].x,
      day1LastFood[0].place_name,
      day1LastFood[0].y,
      day1LastFood[0].x
    );

    // 1일차 마지막 숙소
    const day1LastStay = await getKakaoKeywordSearch(
      day1LastFood[0].y,
      day1LastFood[0].x,
      2000,
      "AD5", // 숙박
      category,
      1
    );

    fiveDistance = await getDistance(
      day1LastFood[0].place_name,
      day1LastFood[0].y,
      day1LastFood[0].x,
      day1LastStay[0].place_name,
      day1LastStay[0].y,
      day1LastStay[0].x
    );

    onePlace = await {
      ...firstFood[0],
      distance: oneDistance.distance,
      duration: oneDistance.duration,
    };
    twoPlace = await {
      ...touristAllSortDistance[1],
      distance: twoDistance.distance,
      duration: twoDistance.duration,
    };
    threePlace = await {
      ...touristAllSortDistance[0],
      distance: threeDistance.distance,
      duration: threeDistance.duration,
    };
    fourPlace = await {
      ...day1LastFood[0],
      distance: fourDistance.distance,
      duration: fourDistance.duration,
    };
    fivePlace = await {
      ...day1LastStay[0],
      distance: fiveDistance.distance,
      duration: fiveDistance.duration,
    };
  }

  return [onePlace, twoPlace, threePlace, fourPlace, fivePlace];
}

// n일차
async function getNDay(
  firstStayDistance: DistnaceDTO[],
  remainFirstStayDistance: KakaoResult[],
  category: string
) {
  // 장소
  let onePlace = null;
  let twoPlace = null;
  let threePlace = null;
  let fourPlace = null;
  let fivePlace = null;
  let sixPlace = null;
  // 거리
  let oneDistance = null;
  let twoDistance = null;
  let threeDistance = null;
  let fourDistance = null;
  let fiveDistance = null;
  let sixDistance = null;

  // 숙소와 가장 가까운 거리순으로 배열 정리
  // firstStaySortDistance[0] : n일째 첫 관광지
  // firstStaySortDistance[1] : n일째 두번째 관광지
  // firstStaySortDistance[2] : n일째 세번째 관광지
  const firstStaySortDistance: KakaoResult[] = await arrayDistances(
    firstStayDistance,
    remainFirstStayDistance
  );

  // n일째 첫 음식점 (n일째 첫 관광지 근처)
  const nFirstFood = await getKakaoKeywordSearch(
    firstStaySortDistance[0].y,
    firstStaySortDistance[0].x,
    2000,
    "FD6", // 음식점
    category,
    1
  );

  // n일째 첫 음식점 => n일째 두번째 관광지 거리
  twoDistance = await getDistance(
    firstStaySortDistance[0].place_name,
    firstStaySortDistance[0].y,
    firstStaySortDistance[0].x,
    nFirstFood[0].place_name,
    nFirstFood[0].y,
    nFirstFood[0].x
  );

  // n일째 첫 음식점 => n일째 두번째 관광지 거리
  threeDistance = await getDistance(
    nFirstFood[0].place_name,
    nFirstFood[0].y,
    nFirstFood[0].x,
    firstStaySortDistance[1].place_name,
    firstStaySortDistance[1].y,
    firstStaySortDistance[1].x
  );

  // n일째 두번째 관광지 => n일째 세번째 관광지 거리
  fourDistance = await getDistance(
    firstStaySortDistance[1].place_name,
    firstStaySortDistance[1].y,
    firstStaySortDistance[1].x,
    firstStaySortDistance[2].place_name,
    firstStaySortDistance[2].y,
    firstStaySortDistance[2].x
  );

  // 마지막 음식점
  const nLastFood = await getKakaoKeywordSearch(
    firstStaySortDistance[2].y,
    firstStaySortDistance[2].x,
    2000,
    "FD6", // 음식점
    category,
    1
  );

  // n일째 세번째 관광지  => n일째 마지막 음식점 거리
  fiveDistance = await getDistance(
    firstStaySortDistance[2].place_name,
    firstStaySortDistance[2].y,
    firstStaySortDistance[2].x,
    nLastFood[0].place_name,
    nLastFood[0].y,
    nLastFood[0].x
  );

  // 숙소
  const nLastStay = await getKakaoKeywordSearch(
    nLastFood[0].y,
    nLastFood[0].x,
    2000,
    "AD5", // 숙소
    category,
    1
  );

  // n일째  마지막 음식점 => n일째 숙소 거리
  sixDistance = await getDistance(
    nLastFood[0].place_name,
    nLastFood[0].y,
    nLastFood[0].x,
    nLastStay[0].place_name,
    nLastStay[0].y,
    nLastStay[0].x
  );

  onePlace = await firstStaySortDistance[0];
  twoPlace = await {
    ...nFirstFood[0],
    distance: twoDistance.distance,
    duration: twoDistance.duration,
  };
  threePlace = await {
    ...firstStaySortDistance[1],
    distance: threeDistance.distance,
    duration: threeDistance.duration,
  };
  fourPlace = await {
    ...firstStaySortDistance[2],
    distance: fourDistance.distance,
    duration: fourDistance.duration,
  };
  fivePlace = await {
    ...nLastFood[0],
    distance: fiveDistance.distance,
    duration: fiveDistance.duration,
  };
  sixPlace = await {
    ...nLastStay[0],
    distance: sixDistance.distance,
    duration: sixDistance.duration,
  };

  return [onePlace, twoPlace, threePlace, fourPlace, fivePlace, sixPlace];
}

// n-1일차
async function getNMinusDay(
  destinationLat: string,
  destinationLng: string,
  remainFirstStayDistance: KakaoResult[],
  day1LastStay: KakaoResult, // 전날숙소
  category: string
) {
  // 장소
  let onePlace = null;
  let twoPlace = null;
  let threePlace = null;
  let fourPlace = null;
  let fivePlace = null;
  let sixPlace = null;
  // 거리
  let oneDistance = null;
  let twoDistance = null;
  let threeDistance = null;
  let fourDistance = null;
  let fiveDistance = null;
  let sixDistance = null;

  // 남은 관광지 중 숙소와 가장 가까운 곳
  const firstStayDistance: DistnaceDTO[] = await Promise.all(
    remainFirstStayDistance.map((place) =>
      getDistance(
        day1LastStay.place_name,
        day1LastStay.y,
        day1LastStay.x,
        place.place_name,
        place.y,
        place.x
      )
    )
  );

  // 숙소와 가장 가까운 거리순으로 배열 정리
  // firstStaySortDistance[0] : n-1일째 첫 관광지
  // firstStaySortDistance[1] : n-1일째 두번째 관광지
  // firstStaySortDistance[2] : n-1일째 세번째 관광지
  const firstStaySortDistance: KakaoResult[] = await arrayDistances(
    firstStayDistance,
    remainFirstStayDistance
  );

  // n-1일째 첫 음식점 (n-1일째 첫 관광지 근처)
  const nFirstFood = await getKakaoKeywordSearch(
    firstStaySortDistance[0].y,
    firstStaySortDistance[0].x,
    2000,
    "FD6",
    category,
    1
  );

  // n-1일째 첫 음식점 => n-1일째 두번째 관광지 거리
  twoDistance = await getDistance(
    firstStaySortDistance[0].place_name,
    firstStaySortDistance[0].y,
    firstStaySortDistance[0].x,
    nFirstFood[0].place_name,
    nFirstFood[0].y,
    nFirstFood[0].x
  );

  // n-1일째 첫 음식점 => n-1일째 두번째 관광지 거리
  threeDistance = await getDistance(
    nFirstFood[0].place_name,
    nFirstFood[0].y,
    nFirstFood[0].x,
    firstStaySortDistance[1].place_name,
    firstStaySortDistance[1].y,
    firstStaySortDistance[1].x
  );

  // n-1일째 두번째 관광지 => n-1일째 세번째 관광지 거리
  fourDistance = await getDistance(
    firstStaySortDistance[1].place_name,
    firstStaySortDistance[1].y,
    firstStaySortDistance[1].x,
    firstStaySortDistance[2].place_name,
    firstStaySortDistance[2].y,
    firstStaySortDistance[2].x
  );

  // N-1일차 핫플 근처 음식점
  const nMiusFood = await getKakaoKeywordSearch(
    destinationLat,
    destinationLng,
    2000,
    "FD6",
    category,
    1
  );

  // n-1일째 세번째 관광지  => n-1일째 마지막 음식점 거리
  fiveDistance = await getDistance(
    firstStaySortDistance[2].place_name,
    firstStaySortDistance[2].y,
    firstStaySortDistance[2].x,
    nMiusFood[0].place_name,
    nMiusFood[0].y,
    nMiusFood[0].x
  );

  // N-1일차 숙소
  const nMiusStay = await getKakaoKeywordSearch(
    nMiusFood[0].y,
    nMiusFood[0].x,
    2000,
    "AD5",
    category,
    1
  );

  // n-1일째  마지막 음식점 => n-1일째 숙소 거리
  sixDistance = await getDistance(
    nMiusFood[0].place_name,
    nMiusFood[0].y,
    nMiusFood[0].x,
    nMiusStay[0].place_name,
    nMiusStay[0].y,
    nMiusStay[0].x
  );

  onePlace = await firstStaySortDistance[0];
  twoPlace = await {
    ...nFirstFood[0],
    distance: twoDistance.distance,
    duration: twoDistance.duration,
  };
  threePlace = await {
    ...firstStaySortDistance[1],
    distance: threeDistance.distance,
    duration: threeDistance.duration,
  };
  fourPlace = await {
    ...firstStaySortDistance[2],
    distance: fourDistance.distance,
    duration: fourDistance.duration,
  };
  fivePlace = await {
    ...nMiusFood[0],
    distance: fiveDistance.distance,
    duration: fiveDistance.duration,
  };
  sixPlace = await {
    ...nMiusStay[0],
    distance: sixDistance.distance,
    duration: sixDistance.duration,
  };

  return [onePlace, twoPlace, threePlace, fourPlace, fivePlace, sixPlace];
}

// 마지막날
async function getLastDay(
  touristAllSortDistance: KakaoResult[],
  nMinusStay: KakaoResult,
  originLat: string,
  originLng: string,
  category: string
) {
  // 장소
  let onePlace = null;
  let twoPlace = null;
  // 거리
  let oneDistance = null;
  let twoDistance = null;
  let threeDistance = null;

  // 마지막 관광지 = touristAllSortDistance[0]
  // n-1일째 숙소 => 마지막 첫 관광지
  oneDistance = await getDistance(
    nMinusStay.place_name,
    nMinusStay.y,
    nMinusStay.x,
    touristAllSortDistance[0].place_name,
    touristAllSortDistance[0].y,
    touristAllSortDistance[0].x
  );
  // 마지막 음식점
  const lastFood = await getKakaoKeywordSearch(
    touristAllSortDistance[0].y,
    touristAllSortDistance[0].x,
    2000,
    "FD6",
    category,
    1
  );
  // 마지막 첫 관광지 => 마지막 음식점
  twoDistance = await getDistance(
    touristAllSortDistance[0].place_name,
    touristAllSortDistance[0].y,
    touristAllSortDistance[0].x,
    lastFood[0].place_name,
    lastFood[0].y,
    lastFood[0].x
  );
  // 마지막 첫 관광지 => 마지막 음식점
  threeDistance = await getDistance(
    lastFood[0].place_name,
    lastFood[0].y,
    lastFood[0].x,
    "집",
    originLat,
    originLng
  );

  onePlace = await {
    ...touristAllSortDistance[0],
    duration: oneDistance.duration,
    distance: oneDistance.distance,
  };
  twoPlace = await {
    ...lastFood[0],
    duration: twoDistance.duration,
    distance: twoDistance.distance,
  };

  return [onePlace, twoPlace, threeDistance];
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
  const originLat = `${data.start.lat}`;
  const originLng = `${data.start.lng}`;

  // 도착장소 경도위도
  const destinationLat = `${data.destination.lat}`;
  const destinationLng = `${data.destination.lng}`;

  // 여행 일정
  // ex ) 1박2일 = 2 , 2박3일 = 3
  // 실제 여행일정 일차

  const startMonth = parseInt(data.date[0].month);
  const endMonth = parseInt(data.date[1].month);
  const startDay = parseInt(data.date[0].day);
  const endDay = parseInt(data.date[1].day);

  const resultMonth = endMonth - startMonth;
  const resultDay = endDay - startDay;

  // 해당 month가 30일인지 31일인지 구하기
  const monthDay =
    startMonth < 8
      ? // 8보다작을때
        startMonth % 2 === 0
        ? //짝수
          30
        : //홀수
          31
      : // 8보다 같거나 클때
      startMonth % 2 === 0
      ? //짝수
        31
      : //홀수
        30;

  const originDate =
    resultMonth === 0 ? resultDay + 1 : monthDay - startDay + endDay + 1;
  const setDate = originDate - 2;
  const date: {
    yaer: string;
    month: string;
    day: string;
  }[] = [];

  // 0 == 마지막날

  // 30 - 28 = 2

  // 28,29,30,1,2,3
  // 0,1,2,3,4,5
  // 2 = monthDay - startDay
  //
  //  2- 1
  for (let i = 0; i < originDate; i++) {
    resultMonth === 0
      ? date.push(
          i === 0
            ? { ...data.date[0] }
            : originDate - 1 === i
            ? { ...data.date[1] }
            : {
                year: data.date[0].year,
                month: data.date[0].month,
                day: String(startDay + i),
              }
        )
      : date.push(
          i === 0
            ? { ...data.date[0] }
            : originDate - 1 === i
            ? { ...data.date[1] }
            : monthDay - startDay < i
            ? // 다음달로 넘어감 [1]
              {
                year: data.date[1].year,
                month: data.date[1].month,
                day: String(endDay - (originDate - i)),
              }
            : // 이전달 [0]
              {
                year: data.date[0].year,
                month: data.date[0].month,
                day: String(startDay + i),
              }
        );
  }

  data.date = date;

  // 관광지 뽑기
  // (3 + 3 * setDate)의 개수만큼 뽑기
  // n = originDate
  // N일 = 관광지 3 + (3 * (n - 2))
  console.log("????");

  const touristPlaces = await getKakaoKeywordSearch(
    destinationLat,
    destinationLng,
    data.radius,
    "AT4",
    data.category,
    3 + 3 * setDate
  );

  if (!touristPlaces?.length) {
    errorConsole("관광지 뽑기 실패");
    return;
  }

  // 출발지로부터 모든 관광지 거리 계산을 병렬로 처리
  const touristAllDistances: DistnaceDTO[] = await Promise.all(
    touristPlaces.map((place) =>
      getDistance(
        null,
        originLat,
        originLng,
        place.place_name,
        place.y,
        place.x
      )
    )
  );

  if (!touristAllDistances?.[0]) {
    errorConsole("거리계산에서 실패");
    return;
  }

  //  모든 관광지 가까운 거리순으로 배열 정리
  // touristAllSortDistance[0] = 마지막날 관광지
  // touristAllSortDistance[1] = 첫날 관광지
  const touristAllSortDistance: KakaoResult[] = await arrayDistances(
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
  const remainFirstTouristSortDistance: KakaoResult[] =
    await touristAllSortDistance.slice(2);

  // 첫날 관광지와 가장 가까운 곳
  const firstTouristDistances: DistnaceDTO[] = await Promise.all(
    remainFirstTouristSortDistance.map((place) =>
      getDistance(
        touristAllSortDistance[1].place_name,
        touristAllSortDistance[1].y,
        touristAllSortDistance[1].x,
        place.place_name,
        place.y,
        place.x
      )
    )
  );

  // 첫날 관광지와 가까운 거리순으로 배열 정리
  // firstTouristSortDistance[0] : 첫날 두번째 관광
  const firstTouristSortDistance: KakaoResult[] = await arrayDistances(
    firstTouristDistances,
    touristPlaces
  );

  // 최종 일정 담을 곳
  let days = [];
  // 마지막 전날 숙소
  let nMinusStay = null;

  // 1일차 구하기
  const firstDay = await getFirstDay(
    touristAllSortDistance,
    originDate,
    destinationLat,
    destinationLng,
    firstTouristSortDistance,
    originLat,
    originLng,
    data.category
  );

  // 1일차 추가
  await days.push(firstDay);

  console.log(firstDay);
  // 1박2일일때 마지막 전날 숙소
  // nMinusStay = firstDay[4];

  // // 2박 3일부터
  // if (firstTouristSortDistance.length > 1) {
  //   console.log("여기는 1박 2일은 나오면 안됨");

  //   // 첫날 두번째 관광지 제외한 배열
  //   const remainFirstStayDistance: KakaoResult[] =
  //     await firstTouristSortDistance.slice(1);

  //   // 남은 관광지 중 숙소와 가장 가까운 곳
  //   let firstStayDistance: DistnaceDTO[] = await Promise.all(
  //     remainFirstStayDistance.map((place) =>
  //       getDistance(
  //         firstDay[4].place_name,
  //         firstDay[4].y,
  //         firstDay[4].x,
  //         place.place_name,
  //         place.y,
  //         place.x
  //       )
  //     )
  //   );

  //   if (firstStayDistance.length / 3 > 1) {
  //     // 3박4일
  //     // 1일차 - n일차 - n-1일차 - 마지막
  //     // N일차 구하기
  //     const nDay = await getNDay(
  //       firstStayDistance,
  //       remainFirstStayDistance,
  //       data.category
  //     );

  //     // n일차 추가
  //     await days.push(nDay);

  //     // 남은 관광지 / 3(N일차 하루 필요 관광지 3) - 1(2일차) - 1(n-1일차)
  //     if (firstStayDistance.length / 3 - 2 > 0) {
  //       // 4박5일부터
  //       // 1일차 - n일차 - ... - n-1일차 - 마지막
  //       for (let i = 0; i < firstStayDistance.length / 3 - 2; i++) {
  //         // 남은 관광지 중 숙소와 가장 가까운 곳
  //         firstStayDistance = await Promise.all(
  //           remainFirstStayDistance.map((place) =>
  //             getDistance(
  //               nDay[5].place_name,
  //               nDay[5].y,
  //               nDay[5].x,
  //               place.place_name,
  //               place.y,
  //               place.x
  //             )
  //           )
  //         );

  //         // N일차 구하기
  //         const nDays = await getNDay(
  //           firstStayDistance,
  //           remainFirstStayDistance,
  //           data.category
  //         );

  //         // n일차 추가
  //         await days.push(nDays);
  //       }
  //     }
  //     // n-1일차 구하기
  //     const nMinusDay = await getNMinusDay(
  //       destinationLat,
  //       destinationLng,
  //       remainFirstStayDistance,
  //       nDay[5],
  //       data.category
  //     );

  //     // n일차 추가
  //     await days.push(nMinusDay);
  //     // 3박4일이상일때 마지막 전날 숙소
  //     nMinusStay = nMinusDay[5];
  //   } else {
  //     // 2박 3일
  //     // 1일차 - n-1일차 - 마지막
  //     // n-1일차 구하기
  //     const nMinusDay = await getNMinusDay(
  //       destinationLat,
  //       destinationLng,
  //       remainFirstStayDistance,
  //       firstDay[4],
  //       data.category
  //     );

  //     // n일차 추가
  //     await days.push(nMinusDay);
  //     // 2박3일일때 마지막 전날 숙소
  //     nMinusStay = nMinusDay[5];
  //   }
  // }

  // // 마지막 구하기
  // const lastDay = await getLastDay(
  //   touristAllSortDistance,
  //   nMinusStay,
  //   originLat,
  //   originLng,
  //   data.category
  // );

  // // 마지막 추가
  // await days.push(lastDay);

  const result = {
    ...data,
    days,
    originDate,
  };

  return result;
}
