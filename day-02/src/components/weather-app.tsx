"use client";

import { FormEvent, useEffect, useState } from "react";
import { Loader2, MapPin, SearchIcon, Waves, Wind } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const WeatherApp = () => {

  const [input, setInput] = useState<string>("karachi");
  const [city, setCity] = useState<string>("karachi");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState({
    temprature: 0,
    description: '',
    humidity: 0,
    wind: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const URL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
        const response = await fetch(URL)

        if (!response.ok) {
          setError("City not found");
          return;
        }

        const data = await response.json();

        setWeather({
          description: data.weather[0].description,
          temprature: parseInt(data.main.temp),
          humidity: data.main.humidity,
          wind: parseInt(data.wind.speed)
        })

      } catch (error) {
        console.log(error)
        setError("Error getting weather details")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()

  }, [city])


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === '') {
      setError("Please enter a city");
      return;
    }
    setCity(input.trim().toLowerCase())
  }

  const getImage = (weather: string) => {
    switch (weather.toLowerCase()) {
      case 'clear':
      case 'cloud':
      case 'mist':
      case 'rain':
      case 'snow':
        return `/${weather.toLowerCase()}.png`;

      default:
        return '/cloud.png'
    }
  }


  return (
    <div className="min-h-screen flex justify-center items-center min-h-100vh">

      <div className="relative w-[400px] h-[555px] rounded-2xl p-5 text-white bg-white bg-opacity-10 backdrop-blur-xl border-2 border-white border-opacity-20">

        <form onSubmit={handleSubmit} className="relative w-full h-14 flex items-center">
          <i className="absolute left-2 text-2xl"> <MapPin /> </i>
          <Input 
            type="text"
            value={input}
            placeholder="Enter your Location"
            onChange={e => setInput(e.target.value)}
            className="absolute w-full h-full bg-transparent border-2 border-white border-opacity-20 outline-none rounded-lg text-xl text-white font-medium uppercase py-0 pl-10 pr-12 placeholder:text-white placeholder:capitalize"
          />
          <Button type="submit" className="absolute right-0 top-0 w-10 h-full bg-transparent border-none outline-none text-3xl text-white py-0 pr-10 pl-1">
            <SearchIcon />
          </Button>
        </form>
        <div className="mx-3 my-1 text-red-500 font-medium">{error ?? error}</div>

        {isLoading ? (
          <div className="flex my-5 mr-3 justify-center items-center gap-2">
            <Loader2 className="animate-spin" />
            <p className="text-xl">Loading</p>
          </div>

        ) : (<>

          <div className="flex flex-col items-center my-10 mx-0">
            <img className="w-[60%] text-center" src={getImage(weather.description)} />
            <p className="temperature relative text-6xl font-bold mt-5 mr-0 mb-1 -ml-8">
              {weather.temprature}<span className="absolute text-2xl ml-1">°C</span>
            </p>
            <p className="description text-xl font-medium capitalize">{weather.description}</p>
          </div>

          <div className="absolute bottom-10 left-0 w-full py-0 px-5 flex">
            <div className="humidity flex items-center w-1/2 pl-5 justify-start">
              <i className="mr-2"><Waves className="size-10" /></i>
              <div>
                <span className="inline-block text-xl font-medium">{weather.humidity}%</span>
                <p className="text-sm font-medium">Humidity</p>
              </div>
            </div>

            <div className="wind flex items-center w-1/2 pr-5 justify-end">
              <i className="mr-2"><Wind className="size-10" /></i>
              <div>
                <span className="inline-block text-xl font-medium">{weather.wind}Km/h</span>
                <p className="text-sm font-medium">Wind Speed</p>
              </div>
            </div>
          </div>
        </>)}

      </div>


    </div>
  )
}

export default WeatherApp
