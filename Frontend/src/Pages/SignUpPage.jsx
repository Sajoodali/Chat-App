import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      try {
        await signup(formData);
      } catch (error) {
        console.error("Signup failed:", error);
        toast.error(
          error.response?.data?.message || "Signup failed. Please try again."
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
            <div className="text-center mb-12">
              <div className="flex flex-col items-center gap-4 group">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <MessageSquare className="w-10 h-10 text-white" />
              </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                  Create Account
                </h1>
                <p className="text-pink-200 text-lg">
                  Join our community and start chatting
                </p>
            </div>
          </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-6 w-6 text-pink-400" />
                </div>
                <input
                  type="text"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-pink-200 focus:outline-none focus:ring-4 focus:ring-pink-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                />
            </div>

              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-6 w-6 text-pink-400" />
                </div>
                <input
                  type="email"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-pink-200 focus:outline-none focus:ring-4 focus:ring-pink-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                />
            </div>

              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-6 w-6 text-pink-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-pink-200 focus:outline-none focus:ring-4 focus:ring-pink-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="Create a password"
                  value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                />
                <button
                  type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-pink-300 hover:text-white transition-colors"
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
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-pink-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:transform-none"
                disabled={isSigningUp}
              >
              {isSigningUp ? (
                <>
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    <span className="ml-2">Creating Account...</span>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
              <p className="text-pink-200">
              Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-white font-semibold hover:text-purple-300 transition-colors"
                >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
      </div>
    </div>
  );
};
export default SignUpPage;
