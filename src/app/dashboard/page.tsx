export default function Page() {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="flex-1 flex flex-col justify-center items-center bg-orange-300 p-6 md:px-10">
          <div className="bg-white  h-full w-full max-w-md md:max-w-none md:h-[97%] md:w-[100%] rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center h-full p-6">
              <img
                alt="System Logo"
                className="w-32 md:w-[21%] mb-2 rounded-lg transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center bg-teal-500 p-6 md:px-10">
          <div className="bg-white dark:bg-[#303135] h-full w-full max-w-md md:max-w-none md:h-[97%] md:w-[100%] rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center h-full p-6 border-2 border-teal-500">
              <h2 className="text-2xl md:text-3xl font-bold text-teal-600 mb-6">
                {"login"}
              </h2>
              <div className="mb-3">
                <input
                  name="email"
                  placeholder="प्रयोगकर्ता नाम प्रविष्ट गर्नुहोस्"
                  className="mb-2"
                />
              </div>

              <div className="mb-3 relative">
                <input
                  name="password"
                  placeholder="पासवर्ड प्रविष्ट गर्नुहोस्"
                  className="mb-2 pr-16"
                />
              </div>

              <div className="flex items-center mt-4 flex-col">
                <button
                  className="hover:bg-teal-50 transition-all duration-200 ease-in-out"
                  type="submit"
                />
                <p className="text-center mt-4">{"No Account"}?</p>
                <p className="text-red-500 hover:underline transition-all duration-200 ease-in-out">
                  {"Forgot Password"}?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
