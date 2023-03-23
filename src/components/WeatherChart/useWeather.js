import { useQuery } from "react-query";
const apiKey = process.env.REACT_APP_WEATHER_API_KEY || "";

function getWeather(location) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&appid=${apiKey}&units=imperial`
  ).then((res) => res.json());
}

export default function useWeather(location) {
  return useQuery(["weather", location], () => getWeather(location), {
    enabled: !!location.lat && !!location.lng, // prevents fetching until location is set
    refetchInterval: 300000, // Refetch data every 5 mins
  });
}
