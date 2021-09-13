import axios from "axios";

const req = axios.create({
  timeout: 20000,
  baseURL: "https://api.opensea.io/api/v1"
});

export default req
