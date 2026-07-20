import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './about-rem.css';
import i1 from "./i1.png"
import im1 from "./im1.png"
import i2 from "./i2.png"
import im2 from "./im2.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
const Aboutrem = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
      offset: 50
    });
  }, []);
  return (
    <div className='aboutrem'>
      <div className='about-content'
        data-aos="zoom-out"


        data-aos-delay="50"
        data-aos-easing="ease-in-out"
        data-aos-duration="1000">
        <h1 style={{ textAlign: "center", fontSize: "300%" }}>A trading platform built for everyone</h1>
        <p style={{ textAlign: "center", fontSize: "150%" }}>At CryptoNest, we believe in democratizing finance. Our platform provides institutional-grade tools with an intuitive interface, ensuring you never miss a market movement.</p>

      </div>
      <div className="batman-boxabout">
        <div className="carderabout card-fixed-height"
          data-aos="fade-up"


          data-aos-delay="50"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000">
          <div className="card__imageabout" style={{ paddingTop: '40px' }}>
            <img src={i1} />
          </div>
          <div className="card__copyabout">
            <h1>Real-Time Market Analytics</h1>
            <p>
              Backed by precise algorithms providing real-time data for every trade. Guarantee your comfort and perfection in making decisions.
            </p>
          </div>
        </div>
        <div className="carderabout card-fixed-height"
          data-aos="fade-down"


          data-aos-delay="50"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000">
          <div className="card__imageabout" style={{ paddingTop: '40px' }}>
            <img src={i2} />
          </div>
          <div className="card__copyabout">
            <h1>Transparent & Zero Hidden Fees</h1>
            <p>
              We provide transparent pricing that emphasizes value. Trade with zero hidden fees and absolute clarity on every transaction you make.
            </p>
          </div>
        </div>
      </div>





      <div className="batman-boxabout">
        <div className="carderabout"
          data-aos="flip-left"


          data-aos-delay="50"
          data-aos-easing="ease-in"
          data-aos-duration="600">
          <div className="card__imageabout">
            <img src={im1} />
          </div>
        </div>
        <div className="carderabout"
        >
          <div className="card__copyabout"
            data-aos="fade-up"


            data-aos-delay="50"
            data-aos-easing="ease-in-out"
            data-aos-duration="800"
          >
            <h1>Our Vision</h1>
            <p>
              To accelerate the global transition to decentralized finance by providing the most accessible and secure crypto trading experience.
            </p>
          </div>
        </div>
      </div>



      <div className="batman-boxabout">
        <div className="carderabout"
          data-aos="fade-down"


          data-aos-delay="50"
          data-aos-easing="ease-in-out"
          data-aos-duration="800"
        >
          <div className="card__copyabout">
            <h1>Our Mission</h1>
            <p>
              Empowering users with real-time data, seamless portfolio management, and a trusted environment to grow their digital assets safely.
            </p>
          </div>
        </div>
        <div className="carderabout"
          data-aos="flip-right"


          data-aos-delay="50"
          data-aos-easing="ease-in"
          data-aos-duration="600">
          <div className="card__imageabout">
            <img src={im2} />
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}
        data-aos="fade"


        data-aos-delay="50"
        data-aos-easing="ease-in-out"
        data-aos-duration="800">
        <h1 style={{ textAlign: "center", fontSize: "3vw" }}>All of this and much more dedicated from <strong style={{ color: " #7380ec" }}>CryptoNest</strong> to your success</h1>
        <Link to="/signup"><button className="banner-b1234">Trade with us</button></Link>
      </div>
    </div>

  );
};

export default Aboutrem;
