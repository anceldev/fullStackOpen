import axios from "axios"
const api_key = import.meta.env.VITE_WEATHER_API_KEY


const baseUrl = "https://api.openweathermap.org/data/3.0/onecall?lat="
const baseIconUrl = "https://openweathermap.org/img/wn/"

const getWeather = (lat, lon) => {
  console.log(api_key)
  const urlRequest = baseUrl + lat + "&lon=" + lon + "&units=metric" +"&appid=" + api_key
  console.log(urlRequest)
  const request = axios.get(urlRequest)
  return request.then(response => response.data)
}

export default { getWeather }