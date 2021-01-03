import React from "react";
import "../Landing.css";
import BackgroundSlideshow from "react-background-slideshow";

import image from "../images/landing-bg.jpg";
import image1 from "../images/food.jpg";
import image2 from "../images/fashion.jpg";
import image3 from "../images/travel.jpg";
import image4 from "../images/photo.jpg";
import image5 from "../images/art.jpeg";
import image6 from "../images/fitness.jpg";
import image7 from "../images/business.jpeg";
import image8 from "../images/draw.jpeg";

function Landing() {
  return (
    <div>
      <div id="landing">
        <BackgroundSlideshow
          images={[
            image,
            image1,
            image2,
            image3,
            image4,
            image5,
            image6,
            image7,
            image8,
          ]}
          animationDelay="1000"
          className="bg"
        />
        <div className="centered">
          <h1 id="heading">ExpressIt</h1>
          <h2 id="tagline">Express, Explore, Excel </h2>
          <h6 id="tagline">Scroll Down to Know More</h6>
        </div>
      </div>
    </div>
  );
}

export default Landing;
