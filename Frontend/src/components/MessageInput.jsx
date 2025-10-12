import React, { useState, useRef } from "react";
import { Send, Image, Paperclip } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useSocketStore } from "../store/useSocketStore";

const MessageInput = ({ selectedUser, onMessageSent }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef(null);
  const { socket } = useSocketStore();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !image) return;

    setSending(true);
    try {
      let imageBase64 = null;
      if (image) {
        const reader = new FileReader();
        reader.onload = async () => {
          imageBase64 = reader.result;
          await sendMessage(imageBase64);
        };
        reader.readAsDataURL(image);
      } else {
        await sendMessage(null);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const sendMessage = async (imageData) => {
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        {
          text: message,
          image: imageData,
        }
      );

      // Emit socket event for real-time messaging
      if (socket) {
        socket.emit("sendMessage", {
          message: response.data,
          receiverId: selectedUser._id,
        });
      }

      onMessageSent(response.data);
      setMessage("");
      removeImage();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  if (!selectedUser) return null;

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      {imagePreview && (
        <div className="mb-4 relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-xs rounded-lg"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={sending}
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          disabled={sending}
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <button
          type="submit"
          disabled={sending || (!message.trim() && !image)}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {sending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
