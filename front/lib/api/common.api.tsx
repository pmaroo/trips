import axios from "axios";

export const imageUpload = async (imageData: FormData) => {
  const { data } = await axios.post(
    "https://api.cloudinary.com/v1_1/dcgq2sysr/image/upload",
    imageData,
  );

  return data;
};
