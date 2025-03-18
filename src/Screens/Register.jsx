import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/auth/useRegister";
import { Loader2 } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { mutate: register, isLoading: isRegistering } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register({ email, password });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3")',
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-800 mb-2">
              Get Started
            </h1>
            <p className="text-gray-600">Create your AI-SmartChat account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all 
                       duration-200 transform hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              {isRegistering ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Creating account...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="text-center text-gray-600 text-sm mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-700 font-medium underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
