function WhoWeAreSection() {
  return (
    <div className="">
      <div className="flex items-center justify-center pt-10">
        <div className="relative inline-block">
          <span className="text-2xl md:text-4xl font-bold">
            About Us
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full" />
        </div>
      </div>
      <section className="py-24 relative w-full text-center mx-auto">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full flex items-center justify-center gap-12 flex-col mx-auto">
            <div className="w-full flex flex-col justify-center items-center gap-10 text-center mx-auto">
              <div className="w-full flex-col justify-center items-center gap-8 flex text-center mx-auto">
                <div className="w-full flex-col justify-center text-center items-center gap-3 flex mx-auto">
                  <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal text-center mx-auto">
                    Empowering Each Other to Succeed
                  </h2>
                  <p className="text-gray-500 text-base font-normal leading-relaxed text-center mx-auto">
                    Every project we've undertaken has been a collaborative effort, where every person involved has left their mark. Together, we've not only constructed buildings but also built enduring connections that define our success story.
                  </p>
                </div>

                {/* Stats Section */}
                <div className="w-full flex justify-center items-center sm:gap-10 gap-5 text-center mx-auto">
                  <div className="flex-col justify-center items-center inline-flex">
                    <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                      33+
                    </h3>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                      Years of Experience
                    </h6>
                  </div>
                  <div className="flex-col justify-center items-center inline-flex">
                    <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                      125+
                    </h4>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                      Successful Projects
                    </h6>
                  </div>
                  <div className="flex-col justify-center items-center inline-flex">
                    <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                      52+
                    </h4>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                      Happy Clients
                    </h6>
                  </div>
                </div>
              </div>
              <button className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                <span className="px-1.5 text-white text-sm font-medium leading-6">
                  Read More
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WhoWeAreSection;
