import courseLogo from "../assets/images/online-course.png";
import tutorLogo from "../assets/images/teacher.png";
import booksLogo from "../assets/images/book.png";

export default function Hero() {
  const cardContent = [
    { logo: courseLogo, text: "online courses" },
    { logo: tutorLogo, text: "expert tutors" },
    { logo: booksLogo, text: "effective methods" },
  ];

  return (
    <div className="flex h-screen w-screen text-white bg-[linear-gradient(109.6deg,rgba(0,0,0,0.93)_11.2%,rgb(63,61,61)_78.9%)]">
      <div className="w-1/2 pl-14 flex flex-col justify-center gap-10  ">
        <h1
          className="text-[3rem] font-extrabold leading-[1.3] "
          style={{ fontFamily: "Ubuntu, sans-serif" }}
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
          wherever you need them. Take control of your education and turn any
          moment into a learning opportunity.
        </p>

        <div className="">
          <button className="  px-4 p-2 font-semibold text-[1.2rem] bg-green-700 rounded-[3px] ">
            Get Started
          </button>
        </div>

        <div className=" flex gap-3">
          {cardContent.map((item, index) => {
            return (
              <div className=" rounded-xl w-32 h-36 p-2 flex flex-col justify-around items-center text-center gap-2 bg-[#404040] ">
                <div className=" w-14 h-14 rounded-full flex justify-center items-center bg-[#202020] ">
                  <img src={item.logo} alt="" className="w-10" />
                </div>
                <span className="text-[1.2rem] leading-[1] ">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className=" w-1/2 ">
        <img
          src="src\assets\images\Online learning-cuate.png"
          alt="background png"
        />
      </div>
    </div>
  );
}
