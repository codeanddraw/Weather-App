import React, { useState } from 'react'
import Header from './Header'
import Content from './Content'
import WeatherSearch from './WeatherSearch'
import axios from 'axios'
import WeatherData from './WeatherData'
import Context from '../Context'
import Error from './Error'
import Tagline from './Tagline'
import DateTime from './DateTime'
import Footer from './Footer'

const Main = () =>{
    const [weather, setWeather] = useState()
    const [ city, setCity ] = useState()
    const [ error, setError ] = useState()

    const api_call = async (e) => {
        e.preventDefault()
        const API_KEY=""
        const location = e.target.elements.location.value
        if(!location) return setError("This location doesn't exist on Earth 🙅🏻!"), setWeather(null)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        const response = await axios.get(url)
        setWeather(response.data.main)
        setCity(response.data.name)
        setError(null)
    }
  
    return <div className="main">
            <Header/>
            <Content>
            <Tagline/>
            <DateTime/>
               <Context.Provider value={{ api_call, weather, city}}>
               <WeatherSearch />
                {weather && <WeatherData />}
                {error && <Error error={error} /> }
               </Context.Provider>
               <Footer/>
            </Content>
        </div>
}

export default Main;