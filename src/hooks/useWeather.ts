import axios from "axios";
import { SearchType } from "../types";

export default function useWeather() {

    //Funcion que va a consultar el clima
    const fetchWeather = async (search: SearchType) => {
        // console.log('Consultando...');
        // Creando la apikey
        const appId = import.meta.env.VITE_API_KEY

        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            // console.log(geoUrl);

            const {data} = await axios(geoUrl) //de forma default viene axios.get()
            console.log(data);
            
            
        } catch (error) {
            console.log(error);
            
        }
        
    }

    return {
        fetchWeather
    }
}