// import React from 'react'
import './home.css'
const Home = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary a">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><span>ZYRO</span><span>2K26</span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" >
                                <a className="nav-link" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Tracks</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Rewards</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Partners</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">FAQ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link s" aria-current="page" href="#">REGISTER NOW</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section className="hero">
                <div className="container">
                    <div className="badge">
                        Innovate &bull; create &bull; impact
                    </div>

                    <h1 className="logo-text">ZYRO <span>2K26</span></h1>

                    <p className="tagline">
                        Where innovation meets <span className="highlight">sustainability</span> for a better world.
                    </p>

                    <div className="btn-group">
                        <button>
                            REGISTER NOW
                            <div id="clip">
                                <div id="leftTop" className="corner"></div>
                                <div id="rightBottom" className="corner"></div>
                                <div id="rightTop" className="corner"></div>
                                <div id="leftBottom" className="corner"></div>
                            </div>
                            <span id="rightArrow" className="arrow"></span>
                            <span id="leftArrow" className="arrow"></span>
                        </button>

                        <button className="button" type="button">
                            <span className="button__text">Download</span>
                            <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" className="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
                        </button>
                    </div>

                    <div className="timer-card">
                        <div className="time-unit">
                            <span className="number">14</span>
                            <span className="label">DAYS</span>
                        </div>
                        <div className="divider"></div>
                        <div className="time-unit">
                            <span className="number">06</span>
                            <span className="label">HOURS</span>
                        </div>
                        <div className="divider"></div>
                        <div className="time-unit">
                            <span className="number">00</span>
                            <span className="label">MINS</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
