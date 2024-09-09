import axios from "axios"

axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/weather?lat=",
})

export default openWeatherAPI