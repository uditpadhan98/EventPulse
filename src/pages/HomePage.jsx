import hero from "../images/hero.png"

export default function HomePage() {
  return (
    <>
       <div className="bg-contain py-5 md:py-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="text-4xl font-bold">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="text-lg md:text-xl">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
          </div>

          <img
            src={hero}
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </div>
    </>
  );
}
