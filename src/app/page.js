// Home page component
export default function Home() {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-white mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            AutoBizz Assessment
          </h1>
          <p className="text-blue-100 mt-3 text-lg sm:text-xl">
            Junior Frontend Engineer — Dashboard Project
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-md"
            >
              Go to Dashboard
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
