import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import SettingPage from "./Pages/SettingPage";
import ProfilePage from "./Pages/ProfilePage";

import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";

import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div
        className={`flex justify-center items-center h-screen transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <Loader className="size-10 animate-spin text-blue-500" />
      </div>
    );

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? "#1f2937" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "#1f2937",
            border: isDarkMode ? "1px solid #374151" : "1px solid #e5e7eb",
          },
        }}
      />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={authUser ? <SettingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;
