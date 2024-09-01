export default function Hero() {
  return (
    <div className="flex h-screen w-screen text-white bg-[linear-gradient(109.6deg,rgba(0,0,0,0.93)_11.2%,rgb(63,61,61)_78.9%)]">
      <div className="w-1/2 pl-14 flex flex-col justify-center gap-10  ">
        <h1 className="text-[3rem] font-extrabold leading-[1.3] ">
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

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
          ratione soluta, corporis ea quas nesciunt sequi architecto nam
          pariatur eveniet?
        </p>

        <div>
          <button>get started</button>
        </div>

        <div className=" flex gap-3">
          <div className=" border rounded-xl w-28 h-32 p-2 flex flex-col justify-center items-center text-center gap-2 ">
            <div className="border w-12 h-12 rounded-full"></div>
            <span>online course</span>
          </div>
          <div className=" border rounded-xl w-28 h-32 p-2 flex flex-col justify-center items-center text-center gap-2 ">
            <div className="border w-12 h-12 rounded-full"></div>
            <p>online courses</p>
          </div>
          <div className=" border rounded-xl w-28 h-32 p-2 flex flex-col justify-center items-center text-center gap-2 ">
            <div className="border w-12 h-12 rounded-full"></div>
            <span>online course</span>
          </div>
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
