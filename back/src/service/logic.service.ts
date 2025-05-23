import axios from "axios";

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
  keyword: string
) {
  const baseUrl =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  let allPlaces: GooglePlace[] = [];
  let nextPageToken: string | undefined = undefined;
  let pageCount = 0;

  do {
    const params: any = nextPageToken
      ? { pagetoken: nextPageToken, key: apiKey }
      : {
          location: `${lat},${lng}`,
          radius,
          keyword,
          key: apiKey,
          type: "restaurant",
          language: "ko",
        };

    // next_page_token은 2초 지연 필요
    if (nextPageToken) {
      await new Promise((res) => setTimeout(res, 2000));
    }

    const response = await axios.get(baseUrl, { params });

    if (response.data.status !== "OK") {
      console.warn(`Google API Warning: ${response.data.status}`);
      break;
    }

    const places = response.data.results.map((place: any) => ({
      placeId: place.place_id,
      name: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      address: place.vicinity,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
    }));

    allPlaces = [...allPlaces, ...places];

    nextPageToken = response.data.next_page_token;
    pageCount++;
  } while (nextPageToken && pageCount < 3); // Google 최대 3페이지

  // user_ratings_total이 1000 이상인 곳만 필터링 후, 최대 60개까지 반환
  const filteredPlaces = allPlaces
    .filter(
      (place) => place.user_ratings_total && place.user_ratings_total >= 100
    )
    .slice(0, 60);

  if (filteredPlaces.length === 0) {
    return null;
  } // 배열이 비어있으면 null 반환
  const randomIndex = Math.floor(Math.random() * filteredPlaces.length);

  const details = await axios.get(
    "https://maps.googleapis.com/maps/api/place/details/json",
    {
      params: {
        place_id: filteredPlaces[randomIndex].placeId,
        key: process.env.GOOGLE_MAPS_API_KEY,
        language: "ko",
        region: "kr",
      },
    }
  );

  const firstFood = {
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
  };

  return firstFood;
}

export async function logic(data: any) {
  const result = await getNearbyGooglePlaces(35.1631, 129.1635, 1000, "음식점");
  console.log(result);
  return;
}
