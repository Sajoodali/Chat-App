import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useSocketStore } from "../store/useSocketStore";
import { useThemeStore } from "../store/useThemeStore";
import { axiosInstance } from "../lib/axios";
import UserList from "../components/UserList";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import { LogOut, Settings, User, Wifi, WifiOff, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authUser, logout } = useAuthStore();
  const { socket, isConnected, connectSocket, disconnectSocket } =
    useSocketStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  // Initialize socket connection when authUser is available
  useEffect(() => {
    if (authUser) {
      connectSocket(authUser);
    }

    return () => {
      disconnectSocket();
    };
  }, [authUser, connectSocket, disconnectSocket]);

  // Fetch messages when user is selected
  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser._id);
    }
  }, [selectedUser]);

  // Setup socket event listeners
  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        // Only add message if it's for the current conversation
        if (
          selectedUser &&
          (newMessage.senderId === selectedUser._id ||
            newMessage.receiverId === selectedUser._id)
        ) {
          setMessages((prev) => [...prev, newMessage]);
        }
      });

      socket.on("messageDelivered", (messageId) => {
        console.log("Message delivered:", messageId);
      });

      return () => {
        socket.off("newMessage");
        socket.off("messageDelivered");
      };
    }
  }, [socket, selectedUser]);

  const fetchMessages = async (userId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageSent = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100"
      }`}
    >
      {/* Header */}
      <div
        className={`backdrop-blur-lg border-b shadow-sm p-4 transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800/90 border-gray-700/50"
            : "bg-white/90 border-gray-200/50"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600"
                    : "bg-gradient-to-br from-blue-500 to-indigo-500"
                }`}
              >
                {authUser?.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt={authUser.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              {isConnected && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h1
                className={`text-xl font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {authUser?.fullName}
              </h1>
              <p
                className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {isConnected ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-200 ${
                isDarkMode
                  ? "text-yellow-400 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Connection Status */}
            <div
              className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors duration-300 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              {isConnected ? (
                <>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span
                    className={`text-xs font-medium transition-colors duration-300 ${
                      isDarkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    Online
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span
                    className={`text-xs font-medium transition-colors duration-300 ${
                      isDarkMode ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    Offline
                  </span>
                </>
              )}
            </div>

            <button
              onClick={() => navigate("/profile")}
              className={`p-3 rounded-full transition-all duration-200 ${
                isDarkMode
                  ? "text-gray-400 hover:text-blue-400 hover:bg-gray-700"
                  : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              }`}
              title="Profile"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/settings")}
              className={`p-3 rounded-full transition-all duration-200 ${
                isDarkMode
                  ? "text-gray-400 hover:text-blue-400 hover:bg-gray-700"
                  : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              }`}
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className={`p-3 rounded-full transition-all duration-200 ${
                isDarkMode
                  ? "text-gray-400 hover:text-red-400 hover:bg-gray-700"
                  : "text-gray-500 hover:text-red-600 hover:bg-red-50"
              }`}
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div
          className={`w-80 flex-shrink-0 border-r transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-800/90 border-gray-700/50"
              : "bg-white/90 border-gray-200/50"
          }`}
        >
          <UserList
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Chat Area */}
        <div
          className={`flex-1 flex flex-col transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-900"
              : "bg-gradient-to-br from-gray-50 to-blue-50"
          }`}
        >
          <MessageList
            messages={messages}
            selectedUser={selectedUser}
            loading={loading}
            isDarkMode={isDarkMode}
          />
          {selectedUser && (
            <MessageInput
              selectedUser={selectedUser}
              onMessageSent={handleMessageSent}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
