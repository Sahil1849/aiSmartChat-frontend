import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-75"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Error code */}
          <h1 className="text-9xl font-bold text-purple-600 mb-4 animate-bounce">
            404
          </h1>

          {/* Error message */}
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Oops! You seem lost
          </h2>
          <p className="mt-2 text-lg text-purple-500">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* SVG Illustration */}
          <div className=" mt-12 flex justify-center">
            <svg
              className="w-32 h-32 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>

          {/* Back to home button */}
          <div className="mt-12">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              Go Back Home
            </Link>
          </div>
        </div>

        {/* Floating circles decoration */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-100 rounded-full opacity-20 mix-blend-multiply filter blur-2xl animate-float"></div>
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-200 rounded-full opacity-20 mix-blend-multiply filter blur-2xl animate-float-delayed"></div>
      </div>
    </div>
  );
};

export default ErrorPage;
