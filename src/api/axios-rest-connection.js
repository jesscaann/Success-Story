import axios from "axios";

export default axios.create({
  baseURL: "https://sogeticasestudyapi.azurewebsites.net/api/",
  headers: {
    "Content-Type": "application/json"
  }
});
/**
 * Other headers can be added here later
 * such as authentication or other specific endpoints
 */
