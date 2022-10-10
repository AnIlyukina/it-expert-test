import { BASE_URL } from "./config";

const getServerResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error(`Ошибка: ${response.status}`));
};

export const getUsersDate = () => {
  return fetch(BASE_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => getServerResponse(res));
};
