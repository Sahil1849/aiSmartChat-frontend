import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/auth/useLogin";
import { Loader2, Lock, Mail } from "lucide-react";
import authImage from "../../public/auth/authImage.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isLoading, isError } = useLogin();

  const submitHandler = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `url(${authImage})`,
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-blue-900/80" />

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-blue-900/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-800 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-blue-200/80">Sign in to continue to AI-SmartChat</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/30 border border-blue-900/30 rounded-xl 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                           text-white placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/30 border border-blue-900/30 rounded-xl 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                           text-white placeholder-gray-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-blue-800 hover:bg-blue-700
                       text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 
                       flex items-center justify-center gap-2 "
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {isError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mt-4">
                <p className="text-red-400 text-center text-sm">
                  Invalid email or password. Please try again.
                </p>
              </div>
            )}

            <p className="text-center text-blue-200/80 text-sm mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
              >
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;