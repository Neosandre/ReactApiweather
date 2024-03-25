import React,{useState} from 'react'

import search from "../assets/search.png"
import cloud from "../assets/cloud.png"
import humidity from "../assets/humidity.png"
import wind from "../assets/wind.png"
import drizle from "../assets/drizzle.png"
import clear from "../assets/clear.png"
import rain from "../assets/rain.png"
import snow from "../assets/snow.png"



export default function WeatherApp() {

  let image= cloud;

  const [weather, setWeather] = useState({
    humidity:"64%",
      wind:"18",
      temp:"24",
      location:"London",
      img:image
  });

const api_key = "d029b0e812afeb4013673ba6c07fa960";

const handleSearch= async ()=>{
const element= document.getElementsByClassName("cityInput");




  
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`

  let response=await fetch(url);
  let data = response.json().then((data)=>{

    if(data.cod == 404){
      const location= document.getElementsByClassName("weather-location");
      location[0].style.color = "red";
      return location[0].innerHTML= data?.message;
    }

if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n" ){

}

switch(data.weather[0].icon) {
  case "01d" || "01n":
     image=clear;
     break
  case "02d" || "02n":
     image=cloud
     break
  case "03d" || "03n":
     image=drizle
     break
  case "04d" || "04n":
     image=drizle
     break
  case "09d" || "09n":
     image=rain
     break
  case "10d" || "10n":
     image=cloud
     break
  case "13d" || "13n":
     image=snow
     break

}
    
    console.log(data)
    setWeather({
    humidity:data?.main?.humidity,
    wind:Math.floor(data?.wind?.speed),
    temp:Math.floor(data?.main?.temp),
    location:data?.name,
    img:image
    
  })
  });
  
  

  
  
  // const humidity = document.getElementsByClassName("humidity-percent");
  // const wind = document.getElementsByClassName("wind-rate");
  // const temp = document.getElementsByClassName("weather-temp");
  // const location= document.getElementsByClassName("weather-location");
  
  // humidity[0].innerHTML= data?.main?.humidity;
  // wind[0].innerHTML= data?.wind?.speed;
  // temp[0].innerHTML= data?.main?.temp;
  // location[0].innerHTML= data?.name;



}


  return (
  
      <div className='container'>
         {/* top  */}
        <div className='top-bar'>
              <input className='cityInput' placeholder='Enter city name...' ></input>

              <div className="search-icon" onClick={()=>{handleSearch()}}>
                <img src={search} alt='cloud and sun '  />
              </div>
              </div>

               {/* middle part */}
               <div className="weather-img">
                <img src={weather.img} alt="cloud" />
               </div>
               <div className="weather-temp">{weather.temp}°c</div>
               <div className="weather-location">{weather.location}</div>

               {/* bottom/footer part */}
               {/* left */}
               <div className="data-container">
                <div className="element">
                  <img src={humidity} alt="" className="icon" />
                  <div className="data">
                    <div className="humidity-percent">{weather.humidity}</div>
                    <div className="text">Humidity</div>
                  </div>
                </div>
                {/* right */}
                <div className="element">
                  <img src={wind} alt="" className="icon" />
                  <div className="data">
                    <div className="wind-rate">{weather.wind} km/h</div>
                    <div className="text">Wind Speed</div>
                  </div>
                </div>
               </div>
        </div>

    

  )
}
