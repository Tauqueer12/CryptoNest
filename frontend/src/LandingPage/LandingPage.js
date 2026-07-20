import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


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


      <section className="text-gray-600 body-font bg-slate-100">
        <div className="max-w-7xl mx-auto flex px-5 py-32 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-40 items-center text-center"
            data-aos="fade-right"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            <h1 className="mb-5 sm:text-7xl text-5xl font-extrabold tracking-tight items-center Avenir xl:w-2/2 text-gray-900">
              Your Gateway to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Decentralized Future</span>
            </h1>
            <p className="mb-4 xl:w-3/4 text-gray-500 text-xl font-medium leading-relaxed">
              Track, trade, and manage your crypto portfolio with real-time market data, advanced charting, and uncompromising security. Join the next generation of investors.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                className="inline-flex items-center px-8 py-4 mt-5 font-semibold text-white transition-all duration-300 ease-in-out bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1"
                to="/signup"
              >
                <span className="justify-center">Sign Up</span>
              </Link>
              <Link
                className="inline-flex items-center px-8 py-4 mt-5 font-semibold text-gray-800 transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1"
                to="/login"
              >
                <span className="justify-center">Login</span>
              </Link>
            </div>
          </div>
          <div className="xl:mr-44 sm:mr-0 sm:mb-28 mb-0 lg:mb-0 mr-4 md:pl-10"
            data-aos="fade-left"
            data-aos-offset="100"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out">
            <img
              className="w-96 mix-blend-multiply rounded-3xl -mt-52 ml-12 drop-shadow-md"
              alt="Crypto Animation"
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
                <h3 className="text-xl font-bold text-gray-900">Real-Time Data</h3>
              </div>
              <div className="flex flex-col items-center justify-center"
                data-aos="fade-up"


                data-aos-delay="50"
                data-aos-easing="ease-in-out"
                data-aos-duration="800"
              >
                <span className="text-4xl mb-2">🔒</span>
                <h3 className="text-xl font-bold text-gray-900">Bank-Grade Security</h3>
              </div>
              <div className="flex flex-col items-center justify-center"
                data-aos="fade-up"


                data-aos-delay="50"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000">
                <span className="text-4xl mb-2">📊</span>
                <h3 className="text-xl font-bold text-gray-900">Portfolio Tracking</h3>
              </div>
              <div className="flex flex-col items-center justify-center"
                data-aos="fade-up"


                data-aos-delay="100"
                data-aos-easing="ease-in-out"
                data-aos-duration="1500">
                <span className="text-4xl mb-2">🌐</span>
                <h3 className="text-xl font-bold text-gray-900">24/7 Global Access</h3>
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
