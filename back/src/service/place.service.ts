import axios from "axios";

export async function findPlaceGoogle(data: any) {
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
          size: 10,
        },
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      }
    );

    console.log(res.data);
    return res.data.documents;
  } catch (error: any) {
    console.error("Kakao API Error:", error?.response?.data || error.message);
    return [];
  }
}
