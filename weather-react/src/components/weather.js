import React, {useState} from "react";

import weatherService from "../services/weatherService";
import Search from "./search";
import '../static/css/weather.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Weather = () => {
    const [weather, setWeather] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const setCity = async (cityName) => {
        let response = await weatherService.getWeatherByCityName(cityName);

        if (response.main) {
            setWeather(response);
            setErrorMessage("");
        } else {
            setWeather("");
            setErrorMessage(response.message);
        }
    }

    const dateBuilder = (d) => {
        let options = {
            weekday: "long", year: "numeric", month: "long",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };

        return d.toLocaleTimeString("en-us", options)
    }

    const tempBuilder = (t) => Math.round(t) + '°c';

    return (
        <div className='app'>
            <main>
                <div className="search-box">
                    <Search setCity={setCity}/>
                </div>
                {weather.main && (
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {tempBuilder(weather.main.temp)}
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                        <div className="map"/>
                    </div>
                )}
                {errorMessage &&
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
                }
            </main>
        </div>
    );
}

export default Weather;