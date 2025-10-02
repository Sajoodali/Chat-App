import { useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import SettingPage from "./Pages/SettingPage";
import ProfilePage from "./Pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";

import { Route, Routes } from "react-router-dom";

function App() {
  const { authUser, checkAuth } = useAuthStore();

  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});
  

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
