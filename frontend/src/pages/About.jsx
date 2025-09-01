import myImage from "../assets/k.JPG";
// image is imported from assets folder

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4 sm:p-6 lg:p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section — Info */}
        <div className="border-2 rounded-2xl p-4 sm:p-6 bg-amber-100 shadow-md">
          <h1 className="font-bold mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            About Us
          </h1>
          <p className="text-gray-700 leading-relaxed mb-3 text-justify text-base sm:text-lg md:text-2xl">
            Welcome to our platform! We are committed to providing high-quality
            services and meaningful experiences for our users. Our mission is to
            build solutions that are simple, effective, and impactful.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify text-base sm:text-lg md:text-2xl">
            With a dedicated team and innovative ideas, we aim to make a
            difference and bring value to the community.
          </p>
        </div>

        {/* Right Section — Image */}
        <div className="flex justify-center">
          <img
            src={myImage}
            alt="About"
            className="rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
