import { useState,useRef, useEffect } from 'react'
import {moonIcon, refreshIcon, sunIcon, arrowUpIcon, bgImageDaytime,bgImageNighttime,bgTabletImageDaytime,bgTabletImageNighttime,bgMobileImageDaytime,bgMobileImageNighttime} from "./const"
import './App.css'

function App() {
  const [showBottom,setShowBottom] = useState(false)
  const [isDay,setIsDay] = useState(true);
  const [quote,setQuote] = useState({author:"John Doe", quote:"It is far greater to have f-ed something up, then to have never even tried to begin with...sometimes at least, probably 🤔"})
  const [hour,setHour] = useState(new Date(Date.now()).toLocaleTimeString().split(":")[0])
  const [minute,setMinute] = useState(new Date(Date.now()).toLocaleTimeString().split(":")[1])
  const dayOfWeek = new Date().getDay();
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const weekNumber = Math.ceil(dayOfYear / 7);
  const appRef = useRef();
  
  const quoteURL = `https://api.quotable.io/random`




  useEffect(()=>{
    // fetchQuote();
    determineIfDay();
    // if(isDay != null){
    //   console.log("IsDay",isDay)
    setBg();
    console.log(new Date(Date.now()).toLocaleTimeString());
    // }
  },[isDay]);


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
    console.log("HOURS",hours)

    if(hours > 7 && hours < 18)setIsDay(true)
    else {
      console.log("nightime!!");
      setIsDay(false);
    }

  }

  onresize=(e)=>{
    console.log(innerWidth)
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


  return (
    <div ref={appRef} className="app">
      <div className="app-content">
        <div className={showBottom ? "top-app-row quote-row hide-top-row" : "top-app-row quote-row"}>
          <div className={showBottom ? "quote-content-container hide-quote" : "quote-content-container show-quote"}>
            <div>
              <h5 className="thin mb-2">{quote.quote}</h5>
              <h5>{quote.author}</h5>
            </div>
            <div>
              <img className="refresh-icon" src={refreshIcon} alt="reload" />
            </div>
          </div>
        </div>
        <div className={showBottom ? "center-app-row main-row elevate-center" : "center-app-row"}>
          <div className="main-row-column">
            <div className="main-row-column-content">
              <div className="main-row-content-header">
                <div>
                  <img src={isDay ? sunIcon : moonIcon} alt="sun" />
                </div>
                <h4 className="uppercase thin">Good morning, it's currently</h4>
              </div>
              <div className="time-content">
                <h1>{hour}:{minute}</h1>
                {/* <div> */}
                <h3 className="timezone thin">BST</h3>
                {/* </div> */}
              </div>
              <div className="location-btn-content">
                <h3 className="uppercase thin">In London, Uk</h3>
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
          <div className="bottom-overlay"></div>
          <div className={isDay ? "bottom-grid-content dark-text" : "bottom-grid-content"}>
            <div className="bottom-grid">
              <div className="grid-container">
                <small className="small thin">Current Timezone</small>
                <h2>Europe/London</h2>
              </div>
              <div className="grid-container">
                <small className="small thin">Days of the Week</small>
                <h2>{dayOfWeek}</h2>
              </div>
              <div className="grid-container">
                <small className="small thin">Days of the Year</small>
                <h2>{dayOfYear}</h2>
              </div>
              <div className="grid-container">
                <small className="small thin">Week number</small>
                <h2>{weekNumber}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
