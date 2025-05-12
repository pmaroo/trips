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
    `https://dapi.kakao.com/v2/local/search/address.json?query=${address}&appkey=9c5894d38bae2a1785adabd46325ccc6`,
    {
      headers: {
        Authorization: `KakaoAK 9c5894d38bae2a1785adabd46325ccc6`,
      },
    },
  );

  return data;
};
