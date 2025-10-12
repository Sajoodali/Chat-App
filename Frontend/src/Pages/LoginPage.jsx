import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const { isDarkMode } = useThemeStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900"
          : "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 h-screen grid lg:grid-cols-2">
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="text-center mb-12">
              <div className="flex flex-col items-center gap-4 group">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-purple-200 text-lg">
                  Sign in to continue your conversations
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-6 w-6 text-purple-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-300 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6" />
                    ) : (
                      <Eye className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:transform-none"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    <span className="ml-2">Signing in...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="text-center">
              <p className="text-purple-200">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-white font-semibold hover:text-pink-300 transition-colors"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image/Pattern */}
        <AuthImagePattern
          title={"Welcome back!"}
          subtitle={
            "Sign in to continue your conversations and catch up with your messages."
          }
        />
      </div>
    </div>
  );
};
export default LoginPage;
