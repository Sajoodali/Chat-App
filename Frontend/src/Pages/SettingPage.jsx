import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  LogOut,
  User,
  Shield,
  Bell,
  Palette,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

const SettingPage = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout");
    }
  };

  const handleDeleteAccount = () => {
    // This would typically open a confirmation modal
    toast.error("Account deletion not implemented yet");
  };

  const settingsItems = [
    {
      icon: <User className="w-5 h-5" />,
      title: "Profile",
      description: "Manage your personal information",
      onClick: () => navigate("/profile"),
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Privacy & Security",
      description: "Control your privacy settings",
      onClick: () => toast.info("Privacy settings coming soon"),
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: "Notifications",
      description: "Manage notification preferences",
      onClick: () => toast.info("Notification settings coming soon"),
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Appearance",
      description: "Customize the app appearance",
      onClick: () => toast.info("Appearance settings coming soon"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  {authUser?.profilePic ? (
                    <img
                      src={authUser.profilePic}
                      alt="Profile"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {authUser?.fullName}
                </h3>
                <p className="text-sm text-gray-500">{authUser?.email}</p>
              </div>
            </div>
          </div>

          {/* Settings Menu */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  General Settings
                </h2>

                <div className="space-y-4">
                  {settingsItems.map((item, index) => (
                    <div
                      key={index}
                      onClick={item.onClick}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="text-gray-500">{item.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Actions */}
              <div className="border-t border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Account Actions
                </h3>

                <div className="space-y-3">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 p-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>

                  <button
                    onClick={handleDeleteAccount}
                    className="w-full flex items-center space-x-3 p-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Chat App v1.0.0</p>
          <p className="mt-1">Made with ❤️ for better communication</p>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
