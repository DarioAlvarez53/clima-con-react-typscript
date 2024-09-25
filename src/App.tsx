import styles from "./App.module.css"
import Form from "./components/Form/Form"
import Spiner from "./components/Spinner/Spiner"
import WeatherDetail from "./components/WeatherDetail/WeatherDetail"
import useWeather from "./hooks/useWeather"

function App() {

  const { weather, fetchWeather, hasWeatherData, loading } = useWeather()
  

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form 
          fetchWeather={fetchWeather}
        />

        {loading && <Spiner />}
        {hasWeatherData && 
          <WeatherDetail 
            weather={weather}
          />
        }
      </div>
    </>
  )
}

export default App
