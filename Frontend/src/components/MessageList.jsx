import React, { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { formatDistanceToNow } from "date-fns";

const MessageList = ({ messages, selectedUser, isDarkMode = false }) => {
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!selectedUser) {
    return (
      <div
        className={`flex-1 flex items-center justify-center transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900"
            : "bg-gradient-to-br from-gray-50 to-blue-50"
        }`}
      >
        <div className="text-center p-8">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transition-colors duration-300 ${
              isDarkMode
                ? "bg-gradient-to-br from-blue-900/30 to-indigo-900/30"
                : "bg-gradient-to-br from-blue-100 to-indigo-100"
            }`}
          >
            <svg
              className={`w-12 h-12 transition-colors duration-300 ${
                isDarkMode ? "text-blue-400" : "text-blue-500"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3
            className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome to ChatApp
          </h3>
          <p
            className={`text-lg transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Select a conversation from the sidebar to start chatting
          </p>
          <div className="mt-6 flex justify-center">
            <div
              className={`w-2 h-2 rounded-full animate-bounce ${
                isDarkMode ? "bg-blue-400" : "bg-blue-500"
              }`}
            ></div>
            <div
              className={`w-2 h-2 rounded-full animate-bounce ml-2 ${
                isDarkMode ? "bg-indigo-400" : "bg-indigo-500"
              }`}
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className={`w-2 h-2 rounded-full animate-bounce ml-2 ${
                isDarkMode ? "bg-blue-400" : "bg-blue-500"
              }`}
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div
        className={`backdrop-blur-lg border-b p-6 shadow-sm transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800/90 border-gray-700/50"
            : "bg-white/90 border-gray-200/50"
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-br from-blue-600 to-indigo-600"
                  : "bg-gradient-to-br from-blue-500 to-indigo-500"
              }`}
            >
              {selectedUser.profilePic ? (
                <img
                  src={selectedUser.profilePic}
                  alt={selectedUser.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-lg">
                  {selectedUser.fullName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3
              className={`text-xl font-semibold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {selectedUser.fullName}
            </h3>
            <p
              className={`text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className={`flex-1 overflow-y-auto p-6 space-y-4 transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-b from-gray-800 to-gray-900"
            : "bg-gradient-to-b from-white to-gray-50"
        }`}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-br from-blue-900/50 to-indigo-900/50"
                  : "bg-gradient-to-br from-blue-100 to-indigo-100"
              }`}
            >
              <svg
                className={`w-8 h-8 transition-colors duration-300 ${
                  isDarkMode ? "text-blue-400" : "text-blue-500"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3
              className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Start the conversation!
            </h3>
            <p
              className={`transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Send your first message below
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === authUser._id;
            return (
              <div
                key={message._id}
                className={`flex ${
                  isOwn ? "justify-end" : "justify-start"
                } group`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg ${
                    isOwn
                      ? isDarkMode
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                      : isDarkMode
                      ? "bg-gray-700 text-gray-100 border border-gray-600/30"
                      : "bg-white text-gray-900 border border-gray-200/50"
                  }`}
                >
                  {message.image && (
                    <div className="mb-3">
                      <img
                        src={message.image}
                        alt="Shared image"
                        className="rounded-xl max-w-full h-auto shadow-md"
                      />
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-2 transition-colors duration-300 ${
                      isOwn
                        ? "text-white/70"
                        : isDarkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {formatDistanceToNow(new Date(message.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
