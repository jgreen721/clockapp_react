import { useState } from 'react'
import {refreshIcon} from "./const"
import './App.css'

function App() {
  const [showBottom,setShowBottom] = useState(false)

  return (
    <div className="app">
      <div className="app-content">
        <div className={showBottom ? "top-app-row quote-row hide-top-row" : "top-app-row quote-row"}>
          <div className={showBottom ? "quote-content-container hide-quote" : "quote-content-container show-quote"}>
            <div>
              <h5 className="thin">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sunt adipisci fugiat cupiditate illum saepe, omnis distinctio, officiis tenetur mollitia vero excepturi!</h5>
              <h5>john doe</h5>
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
                  <img src="" alt="sun" />
                </div>
                <h4>Good morning, it's currently</h4>
              </div>
              <div className="time-content">
                <h1>11:37</h1>
                {/* <div> */}
                <h3 className="timezone">BST</h3>
                {/* </div> */}
              </div>
              <div className="location-btn-content">
                <h3>In London, Uk</h3>
                <button onClick={()=>setShowBottom(!showBottom)} >
                  <div className="btn-content">
                    <h5>{showBottom ? "Less" : "More"}</h5>
                    <img src="" alt="arrow" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={showBottom ?"bottom-app-row info-row" : "bottom-app-row info-row hide-bottom-row"}>
          <div className="bottom-grid-content">
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
