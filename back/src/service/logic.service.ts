import axios from "axios";

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

async function getNearbyGooglePlaces(
  lat: number,
  lng: number,
  radius: number,
  keyword: string,
  type: string
) {
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
    return;
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
    return null;
  } // 배열이 비어있으면 null 반환

  if (type === "restaurant") {
    const randomIndex = Math.floor(Math.random() * filterdPlaces.length);

    const details = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: filterdPlaces[randomIndex].placeId,
          key: process.env.GOOGLE_MAPS_API_KEY,
          language: "ko",
          region: "kr",
        },
      }
    );

    const result: Result = {
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
    };

    return [result];
  } else {
    function getTwoUniqueRandomIndices(max: number) {
      const indices = new Set<number>();
      while (indices.size < 2) {
        const rand = Math.floor(Math.random() * max);
        indices.add(rand);
      }
      return [...indices];
    }

    const [index1, index2] = getTwoUniqueRandomIndices(
      filterdPlaces.length
    ) as [number, number];

    const details = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: filterdPlaces[index1].placeId,
          key: process.env.GOOGLE_MAPS_API_KEY,
          language: "ko",
          region: "kr",
        },
      }
    );

    const details2 = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: filterdPlaces[index2].placeId,
          key: process.env.GOOGLE_MAPS_API_KEY,
          language: "ko",
          region: "kr",
        },
      }
    );

    const result: Result = {
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
    };

    const result2: Result = {
      name: details2.data.result.name,
      address: details2.data.result.formatted_address,
      number: details2.data.result.formatted_phone_number,
      icon: details2.data.result.icon,
      iconBgColor: details2.data.result.icon_background_color,
      iconUrl: details2.data.result.icon_mask_base_uri,
      rating: details2.data.result.rating,
      placeId: details2.data.result.place_id,
      reviews: details2.data.result.reviews,
      servesBeer: details2.data.result.serves_beer,
      servesBrunch: details2.data.result.serves_brunch,
      servesDinner: details2.data.result.serves_dinner,
      servesLunch: details2.data.result.serves_lunch,
      servesWine: details2.data.result.serves_wine,
      takeout: details2.data.result.takeout,
      url: details2.data.result.url,
      userRatingsTotal: details2.data.result.user_ratings_total,
      vicinity: details2.data.result.vicinity,
      lat: details2.data.result.geometry.location.lat,
      lng: details2.data.result.geometry.location.lng,
    };

    return [result, result2];
  }
}

async function snapToRoad(lat: number, lng: number) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const path = `${lat},${lng}`;

  const url = `https://roads.googleapis.com/v1/snapToRoads`;
  const { data } = await axios.get(url, {
    params: {
      path,
      key: apiKey,
    },
  });

  if (data.snappedPoints && data.snappedPoints.length > 0) {
    const snapped = data.snappedPoints[0].location;
    console.log("🛣 스냅된 위치:", snapped);
    return snapped;
  } else {
    console.warn("❌ 스냅된 위치 없음, 도로 근처가 아닐 수 있음");
    return null;
  }
}

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
    // waypoints: wayPoint,
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

  return {
    distance: response.data.routes[0].summary.distance,
    duration: response.data.routes[0].summary.duration,
  };
}

export async function logic(data: any) {
  // 관광지 2곳
  const two = await getNearbyGooglePlaces(
    35.16001944,
    129.1658083,
    10000,
    "관광명소",
    "establishment"
  );

  if (two) {
    // 출발거리 => 두번째 관광명소 거리
    const oneDistance = await getDistance(
      null,
      36.34100904179338,
      127.41704653179124,
      two[0].name,
      two[0].lat,
      two[0].lng
    );

    // 출발거리 => 세번째 관광명소 거리
    const twoDistance = await getDistance(
      null,
      36.34100904179338,
      127.41704653179124,
      two[1].name,
      two[1].lat,
      two[1].lng
    );

    let onePlace = null;
    let twoPlace = null;
    let threePlace = null;
    let fourPlace = null;
    let fivePlace = null;
    if (oneDistance && twoDistance) {
      // 거리순으로 두번째 장소, 세번째 장소 정하기
      twoPlace = await (oneDistance.distance < twoDistance.distance
        ? {
            ...two[0],
            distance: oneDistance.distance,
            duration: oneDistance.duration,
          }
        : {
            ...two[1],
            distance: twoDistance.distance,
            duration: twoDistance.duration,
          });
      threePlace = await (oneDistance.distance < twoDistance.distance
        ? two[1]
        : two[0]);

      if (threePlace) {
        // 네번째 맛집
        const four = await getNearbyGooglePlaces(
          35.16001944,
          129.1658083,
          1000,
          "음식점",
          "restaurant"
        );

        // 첫번째 음식점
        // 첫 관광지 근처 맛집
        const one = await getNearbyGooglePlaces(
          twoPlace.lat,
          twoPlace.lng,
          3000,
          "음식점",
          "restaurant"
        );

        if (one) {
          if (four) {
            // 정한 장소대로 이동시간 구하기(출발지점=>첫번째)
            const startDistance = await getDistance(
              null,
              35.16001944,
              129.1658083,
              one[0].name,
              one[0].lat,
              one[0].lng
            );

            onePlace = {
              ...one[0],
              distance: startDistance.distance,
              duration: startDistance.duration,
            };

            // 정한 장소대로 이동시간 구하기(세번째)
            const threeDistance = await getDistance(
              twoPlace.name,
              twoPlace.lat,
              twoPlace.lng,
              threePlace.name,
              threePlace.lat,
              threePlace.lng
            );

            threePlace = {
              ...threePlace,
              distance: threeDistance.distance,
              duration: threeDistance.duration,
            };

            // 정한 장소대로 이동시간 구하기
            const fourDistance = await getDistance(
              threePlace.name,
              threePlace.lat,
              threePlace.lng,
              four[0].name,
              four[0].lat,
              four[0].lng
            );

            fourPlace = {
              ...four[0],
              distance: fourDistance.distance,
              duration: fourDistance.duration,
            };

            // 다섯번째 숙소
            const five = await getNearbyGooglePlaces(
              fourPlace?.lat,
              fourPlace?.lng,
              1000,
              "숙소",
              "lodging"
            );

            if (five) {
              // 정한 장소대로 이동시간 구하기
              const fiveDistance = await getDistance(
                fourPlace.name,
                fourPlace.lat,
                fourPlace.lng,
                five[0].name,
                five[0].lat,
                five[0].lng
              );

              if (fiveDistance) {
                fivePlace = {
                  ...five[0],
                  distance: fiveDistance.distance,
                  duration: fiveDistance.duration,
                };

                // 1일차 카카오모빌리티 사용횟수 : 6
                const day = [
                  {
                    onePlace,
                    twoPlace,
                    threePlace,
                    fourPlace,
                    fivePlace,
                  },
                ];
                console.log(day);
              }
            }
          }
        }
      }
    }
  }

  return;
}
