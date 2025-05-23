import axios from "axios";

export const imageUpload = async (imageData: FormData) => {
  const { data } = await axios.post(
    "https://api.cloudinary.com/v1_1/dcgq2sysr/image/upload",
    imageData,
  );

  return data;
};

export const latlongAPI = async (address: string) => {
  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${address}&appkey=26df7dfd151672851ce1a3808d2441e6`,
    {
      headers: {
        Authorization: `KakaoAK 26df7dfd151672851ce1a3808d2441e6`,
      },
    },
  );

  return data;
};
