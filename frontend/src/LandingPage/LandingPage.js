
import React, { useEffect } from 'react';


import Aboutrem from '../aboutus/about-rem';
import Footer from './footer';


import AOS from 'aos';
import 'aos/dist/aos.css';
const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
      offset: 50
    });
  }, []);
  return (
    <>


      <section className="text-gray-600 body-font"
        style={{ background: "#fff" }}
      >
        <div className="max-w-7xl mx-auto flex px-5 py-32 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-40 items-center text-center"
            data-aos="fade-right"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            <h1 className="mb-5 sm:text-6xl text-5xl items-center Avenir xl:w-2/2 text-gray-900">
              Your Gateway to the Decentralized Future
            </h1>
            <p className="mb-4 xl:w-3/4 text-gray-600 text-lg">
              Track, trade, and manage your crypto portfolio with real-time market data, advanced charting, and uncompromising security. Join the next generation of investors.
            </p>
            <div className="flex justify-center">
              <a
                className="inline-flex items-center px-5 py-3 mt-5 font-medium text-white hover:bg-slate-600 transition duration-500 ease-in-out transform border rounded-lg bg-gray-900"
                href="/signup"
              >
                <span className="justify-center">Sign Up</span>
              </a>
              <a
                className="inline-flex items-center mx-8 px-5 py-3 mt-5 font-medium text-black hover:bg-slate-300 transition duration-500 ease-in-out transform bg-white border rounded-lg bg-gray-900"
                style={{ border: "1px solid gray" }}
                href="/login"
              >
                <span className="justify-center hover:bg-white-700">Login</span>
              </a>

            </div>
          </div>
          <div className="xl:mr-44 sm:mr-0 sm:mb-28 mb-0 lg:mb-0 mr-4 md:pl-10"
            data-aos="fade-left"
            data-aos-offset="100"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out">
            <img
              className="w-80  py-[-10%]"
              alt="iPhone-12"
              src="/119081-cryptocurrency-lottie-animation.gif"
            ></img>
          </div>
        </div>
        <section className="mx-auto" style={{ display: 'block' }}>
          <div className="px-5 mx-auto lg:px-24 ">
            <div className="flex flex-col w-full mb-4 text-left lg:text-center">
            </div>
            <div className="grid grid-cols-2 gap-16 mb-16 text-center lg:grid-cols-4">
              <div className="flex flex-col items-center justify-center"
                data-aos="fade-up"


                data-aos-duration="1000"
              >
                <span className="text-4xl mb-2">⚡</span>
                <h3 className="text-xl font-bold text-gray-800">Real-Time Data</h3>
              </div>
              <div className="flex flex-col items-center justify-center"
                data-aos="fade-up"


                data-aos-delay="50"
                data-aos-easing="ease-in-out"
                data-aos-duration="800"
              >
                <span className="text-4xl mb-2">🔒</span>
                <h3 className="text-xl font-bold text-gray-800">Bank-Grade Security</h3>
              </div>
              <div className="flex flex-col items-center justify-center"
                data-aos="fade-up"


                data-aos-delay="50"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000">
                <span className="text-4xl mb-2">📊</span>
                <h3 className="text-xl font-bold text-gray-800">Portfolio Tracking</h3>
              </div>
              <div className="flex flex-col items-center justify-center"
                data-aos="fade-up"


                data-aos-delay="100"
                data-aos-easing="ease-in-out"
                data-aos-duration="1500">
                <span className="text-4xl mb-2">🌐</span>
                <h3 className="text-xl font-bold text-gray-800">24/7 Global Access</h3>
              </div>
            </div>
          </div>
        </section>





        <Aboutrem />


      </section>
      <Footer />
    </>
  );
}

export default LandingPage;
