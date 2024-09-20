import axios from "axios";
import { SearchType } from "../types";
// import { z } from "zod";
import { object, string, number,InferOutput, parse } from "valibot"

// function isWeatherResponse(weather: unknown) {
//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' && //te retorna el tipo de dato que tiene una variable
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number'
//     )
// }

// //Zod schema
// const Weather = z.object({
//     name: z.string(),
//     main: z.object({
//         temp: z.number(),
//         temp_max: z.number(),
//         temp_min: z.number()
//     })
// })
// //Creacion del type
// type Weather = z.infer<typeof Weather>

//Valibot schema
const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number()
    })
})
//Creacion del type
type Weather = InferOutput<typeof WeatherSchema>

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
            // console.log(data);
            

            //creando la variable para traer la latitud
            const lat = data[0].lat
            //creando la variable para traer la longitud
            const lon = data[0].lon
            
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            
            //Castear el type, definirlo por mi mismo
            // const { data: weatherResult } = await axios<Weather>(weatherUrl)
            // console.log(weatherResult);
            
            // Type guards = con esta si puedes garantizar que es de esa forma
            // const { data: weatherResult } = await axios(weatherUrl)
            // const result = isWeatherResponse(weatherResult)
            // console.log(result);
            
            // //Implementando libreria Zod
            // const { data: weatherResult } = await axios(weatherUrl)
            // const result = Weather.safeParse(weatherResult)
            // if(result.success) {
            //     console.log(result.data.name);
            //     console.log(result.data.main.temp);
            // }
            
            //Implementando libreria Valibot
            const { data: weatherResult } = await axios(weatherUrl)
            const result = parse(WeatherSchema, weatherResult)
            if(result) {
                console.log(result.name);
                console.log(result.main.temp);
                
            }
            

        } catch (error) {
            console.log(error);
            
        }
        
    }

    return {
        fetchWeather
    }
}