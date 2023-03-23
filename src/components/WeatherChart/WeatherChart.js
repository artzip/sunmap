import styled from "styled-components";
import { DateTime } from "luxon";
import Box from "../_layout/Box";
import Column from "../_layout/Column";
import Columns from "../_layout/Columns";
import Text from "../_content/Text";
import useWeather from "./useWeather";
import SunTile from "./SunTile";

const Chart = styled(Box)`
  flex-direction: column;
  max-width: 700px;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
`;

function imageSize({ size }) {
  switch (size) {
    case "small":
      return `
        height: 50px;
        width: 50px;
      `;
    case "medium":
      return `
        height: 75px;
        width: 75px;
      `;
    case "large":
    default:
      return `
        height: 100px;
        width: 100px;
      `;
  }
}

const WeatherImage = styled.img`
  ${imageSize}
  background: rgba(34, 37, 41, 0.3);
  border-radius: 50%;
  margin: 10px 0;
`;

function DayForecast({ dateTime, dayWeather }) {
  return (
    <SunTile
      weather={dayWeather}
      dateTime={dateTime}
      grow="1"
      margin="0 10px 10px 0"
    >
      <Text size="xsmall">{dateTime.toFormat("ccc")}</Text>
      <Text size="xsmall">{dateTime.toFormat("LLL d")}</Text>
      <WeatherImage
        src={`http://openweathermap.org/img/wn/${dayWeather.weather[0].icon}.png`}
        alt={dayWeather.weather[0].description}
        size="small"
      />
      <div>
        <Text size="small">{Math.floor(dayWeather.temp.day)}</Text>
        <Text size="xsmall"> {Math.floor(dayWeather.temp.night)}</Text>
      </div>
    </SunTile>
  );
}

function WeatherChart({ location }) {
  const { isLoading, isError, isIdle, data, error } = useWeather(location);
  const dt = DateTime.now();

  if (isIdle) {
    return <div />;
  }
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Chart role="WeatherChart">
      <Text size="medium">Today's Weather</Text>
      <Text size="xsmall">{dt.toLocaleString(DateTime.DATE_SHORT)}</Text>
      <Columns justifyContent="flex-start" padding="15px 0 " alignItems="start">
        <SunTile
          weather={data.current}
          dateTime={dt}
          grow="0"
          sunrise={data.current.sunrise}
          sunset={data.current.sunset}
          size="large"
        >
          <Text size="small">{dt.toLocaleString(DateTime.TIME_SIMPLE)}</Text>
          <Text size="xlarge" role="CurrentTemp">
            {Math.floor(data.current.temp)}
          </Text>
          <WeatherImage
            src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
            alt={data.current.weather[0].description}
          />
        </SunTile>
        <Column margin="0 20px" padding="15px 0 0 0" alignItems="right">
          <Text size="xsmall">+ 4 hrs</Text>
        </Column>
        <SunTile
          weather={data.hourly[4]}
          dateTime={dt.plus({ hours: 4 })}
          grow="0"
          sunrise={data.current.sunrise}
          sunset={data.current.sunset}
          size="medium"
        >
          <Text size="small">
            {dt.plus({ hours: 4 }).toLocaleString(DateTime.TIME_SIMPLE)}
          </Text>
          <Text size="large">{Math.floor(data.hourly[4].temp)}</Text>
          <WeatherImage
            src={`http://openweathermap.org/img/wn/${data.hourly[5].weather[0].icon}@2x.png`}
            alt={data.hourly[5].weather[0].description}
            size="medium"
          />
        </SunTile>
      </Columns>
      <Text size="medium" margin="30px 0">
        5-Day Forecast
      </Text>
      <Columns wrap="wrap" justifyContent="space-between">
        {[...Array(5)].map((value, index) => (
          <DayForecast
            dateTime={dt.plus({ days: index + 1 })}
            dayWeather={data.daily[index + 1]}
          />
        ))}
      </Columns>
    </Chart>
  );
}

export default WeatherChart;
