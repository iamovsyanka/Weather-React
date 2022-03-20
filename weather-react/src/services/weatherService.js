import {api} from "../config/config"

class WeatherService {
    async getWeatherByCityName(cityName) {
        return await fetch(`${api.url}weather?q=${cityName}&units=metric&APPID=${api.key}`)
            .then(resp => resp.json());
    }
}

export default new WeatherService();