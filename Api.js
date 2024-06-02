const BASE_URL = "https://seb.digitalsphereinc.com/";
const API_URL = BASE_URL + "api/";

const getData = async (endpoint) => {
  let result = await fetch(API_URL + endpoint).then((res) => res.json());
  return result;
};

export const getArticle = async (options = "") => {
  return getData("news/" + options);
};

export const getArticleDetail = async (article_id) => {
  return getData("newsdetail/" + article_id);
};

export const getCategories = async () => {
  return getData("category");
};

export const getHomeItems = async () => {
  return getData("home");
};
