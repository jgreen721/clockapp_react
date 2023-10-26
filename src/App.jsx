import { useState,useRef, useEffect } from 'react'
import {moonIcon, refreshIcon, sunIcon, arrowUpIcon, bgImageDaytime,bgImageNighttime,bgTabletImageDaytime,bgTabletImageNighttime,bgMobileImageDaytime,bgMobileImageNighttime} from "./const"
import './App.css'

function App() {
  const [showBottom,setShowBottom] = useState(false)
  const [isDay,setIsDay] = useState(true);
  const [quote,setQuote] = useState({author:"John Doe", quote:"It is far greater to have f-ed something up, then to have never even tried to begin with...sometimes at least, probably 🤔"})
  const appRef = useRef();
  



  useEffect(()=>{

    setBg(isDay)
  },[]);


  const setBg =(isDay)=>{
      if(isDay){
        appRef.current.style.backgroundImage = `url(${bgImageDaytime})`
      }
      else{
        appRef.current.style.backgroundImage = `url(${bgImageNighttime})`

      }
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
        <div className="center-app-row main-row">
          <div className="main-row-column">
            <div className="main-row-column-content">
              <div className="main-row-content-header">
                <div>
                  <img src={isDay ? sunIcon : moonIcon} alt="sun" />
                </div>
                <h4 className="uppercase thin">Good morning, it's currently</h4>
              </div>
              <div className="time-content">
                <h1>11:37</h1>
                {/* <div> */}
                <h3 className="timezone">BST</h3>
                {/* </div> */}
              </div>
              <div className="location-btn-content">
                <h3 className="uppercase thin">In London, Uk</h3>
                <button className="btn" onClick={()=>setShowBottom(!showBottom)} >
                  <div className="btn-content">
                    <p className="thin uppercase">{showBottom ? "Less" : "More"}</p>
                    <img src={arrowUpIcon} alt="arrow" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={showBottom ?"bottom-app-row info-row" : "bottom-app-row info-row hide-bottom-row"}>
          <div className="bottom-overlay"></div>
          <div className={isDay ? "bottom-grid-content" : "bottom-grid-content dark-text"}>
            <div className="bottom-grid">
              <div className="grid-container">
                <small className="small thin">Current Timezone</small>
                <h2>Europe/London</h2>
              </div>
              <div className="grid-container">
                <small className="small thin">Days of the Week</small>
                <h2>5</h2>
              </div>
              <div className="grid-container">
                <small className="small thin">Days of the Year</small>
                <h2>295</h2>
              </div>
              <div className="grid-container">
                <small className="small thin">Week number</small>
                <h2>42</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
