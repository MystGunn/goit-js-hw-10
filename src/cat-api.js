import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_pPEJhyQ9PauU81XNg6Wk6Kfo8D7deKdRPW2XbI7eNDr94fspxyv6JKPXPAzyuyo7";

export async function fetchBreeds() {
  const response = await axios.get("https://api.thecatapi.com/v1/breeds");
  return response.data;
}

export async function fetchCatByBreed(breedId) {
  const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
  return response.data[0];
}