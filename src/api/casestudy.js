import axios from "axios";

export default axios.create({
  baseURL: "https://sogeticasestudyapi.azurewebsites.net/api/",
  headers: {
    "Content-Type": "application/json"
  }
});
