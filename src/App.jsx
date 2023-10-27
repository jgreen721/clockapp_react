import { useState,useRef, useEffect } from 'react'
import {moonIcon, refreshIcon,darkRefreshIcon, sunIcon, arrowUpIcon, bgImageDaytime,bgImageNighttime,bgTabletImageDaytime,bgTabletImageNighttime,bgMobileImageDaytime,bgMobileImageNighttime} from "./const"
import './App.css'

function App() {
  const [showBottom,setShowBottom] = useState(false)
  const [isDay,setIsDay] = useState(false);
  const [quote,setQuote] = useState({author:"John Doe", quote:"It is far greater to have f-ed something up, then to have never even tried to begin with...sometimes at least, probably 🤔"});
  const [greeting,setGreeting] = useState("Good Morning");
  const [hours,setHours] = useState(new Date(Date.now()).toLocaleTimeString().split(":")[0])
  const [minutes,setMinutes] = useState(new Date(Date.now()).toLocaleTimeString().split(":")[1])
  const [seconds,setSeconds] = useState(new Date().getSeconds());

  const [timeZone,setTimeZone] = useState("California, US")
  const [location,setLocation] = useState("Los Angeles,US")
  const dayOfWeek = new Date().getDay();
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const weekNumber = Math.ceil(dayOfYear / 7);
  const appRef = useRef();
  const quoteRef = useRef();
  const APIKEY=import.meta.env.VITE_REACT_APP_API_KEY
  const locationURL = import.meta.env.VITE_REACT_APP_LOCATION_URL
  const quoteURL = import.meta.env.VITE_REACT_APP_QUOTE_URL






  useEffect(()=>{
      fetchQuote();
      fetchLocation()
      determineIfDay();
    setBg();
    
  },[isDay]);


  const fetchLocation = async()=>{
    let response = await fetch(`${locationURL}?apikey=${APIKEY}`);
    response = await response.json();
    console.log(response,response.data.timezone.id)
    setTimeZone(response.data.timezone.id);
    setLocation(response.data.location.city.name + "," + response.data.location.country.alpha2)
}


  useEffect(()=>{

    let timerInt = setInterval(()=>{
      
      let tempSeconds = seconds;
      let tempMinutes = minutes;
      let tempHours = hours;
      tempSeconds++;
      if(tempSeconds == 60){
        tempSeconds = 0;
        tempMinutes++;
        if(tempMinutes == 60){
          tempMinutes = 0;
          tempHours++;
          if(tempHours > 12){
            tempHours = 1;
          }
        }
      }
      setSeconds(tempSeconds);
      setMinutes(tempMinutes);
      setHours(tempHours);
      
    },1000);

    return ()=>clearInterval(timerInt);
  })


  const setBg =()=>{
      if(isDay){
        appRef.current.style.backgroundImage = `url(${bgImageDaytime})`
      }
      else{
        appRef.current.style.backgroundImage = `url(${bgImageNighttime})`

      }
  }

  const determineIfDay = ()=>{
    let hours = new Date().getHours();
    // console.log("HOURS",hours)

    if(hours > 7 && hours < 18)setIsDay(true)
    else {
      console.log("nightime!!");
      setIsDay(false);
    }

    if(hours < 10)setGreeting("Good Morning");
    else if(hours < 15)setGreeting("Good Afternoon");
    else if(hours < 20) setGreeting("Good Evening");
    else setGreeting("Zzzzzz 😴")

  }

  onresize=(e)=>{
    if(innerWidth > 1050){
      if(isDay){
        appRef.current.style.backgroundImage = `url(${bgImageDaytime})`
        }
      else{
        appRef.current.style.backgroundImage = `url(${bgImageNighttime})`

      }
    }
    else if(innerWidth > 550){
      if(isDay){
        appRef.current.style.backgroundImage = `url(${bgTabletImageDaytime})`
        }
      else{
        appRef.current.style.backgroundImage = `url(${bgTabletImageNighttime})`

      }
    }
    else{
      if(isDay){
        appRef.current.style.backgroundImage = `url(${bgMobileImageDaytime})`
        }
      else{
        appRef.current.style.backgroundImage = `url(${bgMobileImageNighttime})`

      }

    }
  }

  const fetchQuote = async()=>{
    let response = await fetch(quoteURL);
    response = await response.json();
    console.log(response)
    setQuote({author:response.author,quote:response.content})
  }

  const fetchNewQuote=async()=>{
      if(quoteRef.current.classList.contains("fade-out"))return;
      if(quoteRef.current.classList.contains("fade-in")){
        quoteRef.current.classList.remove("fade-in");

      }
      quoteRef.current.classList.add("fade-out");
      setTimeout(async()=>{
            await fetchQuote();
            quoteRef.current.classList.add("fade-in");
            quoteRef.current.classList.remove("fade-out");

      },2500);


  }


  return (
    <div ref={appRef} className="app">
      <div className="app-content">
        <div ref={quoteRef} className={showBottom ? "top-app-row quote-row hide-top-row" : "top-app-row quote-row"}>
          <div className={showBottom ? "quote-content-container hide-quote" : "quote-content-container show-quote"}>
            <div>
              <h5 className="thin mb-2">{quote.quote}</h5>
              <h5>{quote.author}</h5>
            </div>
            <div onClick={fetchNewQuote}>
              <img className="refresh-icon" src={isDay ? darkRefreshIcon : refreshIcon} alt="reload" />
            </div>
          </div>
        </div>
        <div className={showBottom ? "center-app-row main-row elevate-center" : "center-app-row"}>
          <div className="main-row-column">
            <div className="main-row-column-content">
              <div className="main-row-content-header">
                <div className="day-icon-div">
                  <img className="day-icon" src={isDay ? sunIcon : moonIcon} alt="sun" />
                </div>
                <h4 className="uppercase thin">{greeting}, it's currently</h4>
              </div>
              <div className="time-content">
                <h1>{hours}:{minutes.toString().padStart(2,"0")}</h1>
                {/* <div> */}
                <h3 className="timezone thin">BST</h3>
                {/* </div> */}
              </div>
              <div className="location-btn-content">
                <h3 className="uppercase thin">In {location}</h3>
                <button className="btn" onClick={()=>setShowBottom(!showBottom)} >
                  <div className="btn-content">
                    <p className="thin uppercase">{showBottom ? "Less" : "More"}</p>
                    <img className={showBottom ? "arrow-icon rotate-arrow" : "arrow-icon"} src={arrowUpIcon} alt="arrow" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={showBottom ?"bottom-app-row info-row" : "bottom-app-row info-row hide-bottom-row"}>
          <div className={isDay ? "bottom-overlay gray-overlay" : "bottom-overlay black-overlay"}></div>
          <div className={isDay ? "bottom-grid-content dark-text" : "bottom-grid-content"}>
            <div className="bottom-grid">
              <div className="grid-container">
                <small className="small thin">Current Timezone</small>
                <h2 style={{"--i":".5s"}} className={showBottom ? "scale-el" : "shrink-el"}>{timeZone}</h2>
              </div>
              <div className="grid-container">
                <small className="small thin">Days of the Week</small>
                <h2 style={{"--i":"1s"}} className={showBottom ? "scale-el" : "shrink-el"}>{dayOfWeek}</h2>
              </div>
              <div className="grid-container">
                <small className="small thin">Days of the Year</small>
                <h2 style={{"--i":"1.5s"}} className={showBottom ? "scale-el" : "shrink-el"}>{dayOfYear}</h2>
              </div>
              <div className="grid-container">
                <small className="small thin">Week number</small>
                <h2 style={{"--i":"2s"}} className={showBottom ? "scale-el" : "shrink-el"}>{weekNumber}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
