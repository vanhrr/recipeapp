import axios from "axios";

const request = axios.create({
  baseURL: "https://forkify-api.herokuapp.com/api/v2/recipes",
});
export default request;

export const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response.data;
};

export const getDetailFood = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response.data.data;
};
