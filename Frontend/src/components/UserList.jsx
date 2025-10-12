import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import { useSocketStore } from "../store/useSocketStore";
import { MessageCircle, User, Clock } from "lucide-react";

const UserList = ({ selectedUser, setSelectedUser, isDarkMode = false }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthStore();
  const { userStatuses } = useSocketStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/messages/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Helper function to format last seen time
  const getLastSeen = (user) => {
    // Check real-time status first
    const realTimeStatus = userStatuses.get(user._id);
    if (realTimeStatus && realTimeStatus.isOnline) {
      return "Online";
    }

    // Use real-time lastSeen if available, otherwise fallback to user data
    const lastSeenTime = realTimeStatus?.lastSeen || user.lastSeen;
    if (!lastSeenTime) return "Unknown";

    const lastSeen = new Date(lastSeenTime);
    const now = new Date();
    const diffInMinutes = Math.floor((now - lastSeen) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return lastSeen.toLocaleDateString();
  };

  // Helper function to check if user is online
  const isUserOnline = (user) => {
    const realTimeStatus = userStatuses.get(user._id);
    return realTimeStatus?.isOnline || user.isOnline || false;
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              ></div>
              <div className="flex-1 space-y-2">
                <div
                  className={`h-4 rounded w-3/4 ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`h-3 rounded w-1/2 ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-300"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div
        className={`p-6 border-b transition-colors duration-300 ${
          isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
              isDarkMode
                ? "bg-gradient-to-br from-blue-600 to-indigo-600"
                : "bg-gradient-to-br from-blue-500 to-indigo-500"
            }`}
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <h2
            className={`text-xl font-semibold transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Conversations
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-br from-blue-900/50 to-indigo-900/50"
                  : "bg-gradient-to-br from-blue-100 to-indigo-100"
              }`}
            >
              <MessageCircle
                className={`w-8 h-8 transition-colors duration-300 ${
                  isDarkMode ? "text-blue-400" : "text-blue-500"
                }`}
              />
            </div>
            <h3
              className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              No conversations yet
            </h3>
            <p
              className={`text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Start chatting with other users!
            </p>
          </div>
        ) : (
          users.map((user) => {
            const isOnline = isUserOnline(user);
            const lastSeen = getLastSeen(user);

            return (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`m-2 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${
                  selectedUser?._id === user._id
                    ? isDarkMode
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-[1.01]"
                      : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-[1.01]"
                    : isDarkMode
                    ? "bg-gray-700/50 hover:bg-gray-600/70 border border-gray-600/30"
                    : "bg-white/70 hover:bg-white/90 border border-gray-200/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                        selectedUser?._id === user._id
                          ? "bg-white/20 border-2 border-white/30"
                          : isDarkMode
                          ? "bg-gradient-to-br from-blue-600 to-indigo-600"
                          : "bg-gradient-to-br from-blue-500 to-indigo-500"
                      }`}
                    >
                      {user.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt={user.fullName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <User
                          className={`w-6 h-6 ${
                            selectedUser?._id === user._id
                              ? "text-white"
                              : "text-white"
                          }`}
                        />
                      )}
                    </div>
                    {isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm font-semibold truncate ${
                          selectedUser?._id === user._id
                            ? "text-white"
                            : isDarkMode
                            ? "text-gray-200"
                            : "text-gray-900"
                        }`}
                      >
                        {user.fullName}
                      </p>
                      {!isOnline && (
                        <div
                          className={`flex items-center space-x-1 ${
                            selectedUser?._id === user._id
                              ? "text-white/60"
                              : isDarkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{lastSeen}</span>
                        </div>
                      )}
                    </div>
                    <p
                      className={`text-xs truncate ${
                        selectedUser?._id === user._id
                          ? "text-white/80"
                          : isDarkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      {isOnline ? "Online" : lastSeen}
                    </p>
                  </div>

                  {selectedUser?._id === user._id && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserList;
