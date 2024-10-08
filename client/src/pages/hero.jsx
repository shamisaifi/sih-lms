import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";

import courseLogo from "../assets/images/online-course.png";
import tutorLogo from "../assets/images/teacher.png";
import booksLogo from "../assets/images/book.png";
import hero1Animation from "../assets/animations/hero1.json";
import hero2Animation from "../assets/animations/hero2.json";
import { Link } from "react-router-dom";

export default function Hero() {
  const cardContent = [
    { logo: courseLogo, text: "online courses" },
    { logo: tutorLogo, text: "expert tutors" },
    { logo: booksLogo, text: "effective methods" },
  ];

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      <div className="w-full px-28 text-white bg-[linear-gradient(109.6deg,rgba(0,0,0,0.93)_11.2%,rgb(63,61,61)_78.9%)]">
        <div className="flex w-full py-28 ">
          <div className="w-1/2  flex flex-col  gap-10  ">
            <h1
              className="text-[2.8rem] font-extrabold leading-[1.1] "
              style={{ fontFamily: "Ubuntu, sans-serif" }}
              data-aos="fade-down"
            >
              <span>Take Your</span>
              <br />
              <span>Knowledge to the</span>
              <br />
              <p>
                <span className="text-green-300">Next Level</span> with{" "}
                <span className="text-orange-400">Gyaan</span>
                <span className="text-yellow-400">Setu</span>
              </p>
            </h1>

            <p className=" w-1/2" style={{ fontFamily: "Ubuntu, sans-serif" }}>
              Your classroom, your rules—access learning materials whenever and
              wherever you need them. Take control of your education and turn
              any moment into a learning opportunity.
            </p>

            <div className="">
              <Link to="portal">
                <button
                  class="font-sans flex justify-between gap-2 items-center  shadow-xl text-lg bg backdrop-blur-md lg:font-semibold isolation-auto border-white before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-yellow-600 hover:text-black before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                  type="submit"
                >
                  Get Started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 19"
                    class="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-white group-hover:border-none p-2 rotate-45"
                  >
                    <path
                      class="fill-white group-hover:fill-gray-800"
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className=" flex gap-3">
              {cardContent.map((item, index) => {
                return (
                  <div className=" rounded-xl w-32 h-36 p-2 flex flex-col justify-around items-center text-center gap-2 bg-[#404040] ">
                    <div className=" w-14 h-14 rounded-full flex justify-center items-center bg-[#202020] ">
                      <img src={item.logo} alt="" className="w-10" />
                    </div>
                    <span className="text-[1.2rem] leading-[1] ">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className=" w-1/2 flex justify-center items-center"
            data-aos="fade-left"
          >
            <Lottie animationData={hero1Animation} />
          </div>
        </div>

        <div className="w-full pb-28 flex items-center ">
          <div
            className=" w-1/2 flex justify-center items-center"
            data-aos="fade-right"
          >
            <Lottie animationData={hero2Animation} />
          </div>
          <div>
            <p
              className="text-[2.8rem] font-extrabold leading-[1.1] text-green-300"
              style={{ fontFamily: "Ubuntu, sans-serif" }}
              data-aos="fade-up"
            >
              Enhance your <span>knowledge</span> and
              <br />{" "}
              <span className="text-yellow-400">advance your career</span>{" "}
              <br /> with our diverse range of courses!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
