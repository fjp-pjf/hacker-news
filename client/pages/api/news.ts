import axios from "axios";

export const getNewsToday = async () => {
  const response = await axios.get("http://localhost:8080/news/saved-stories");
  return response.data;
};
