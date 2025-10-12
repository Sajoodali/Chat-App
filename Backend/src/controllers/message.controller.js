import User from "../models/user.model.js";
import Message from "../models/message.modle.js";
import cloudinary from "../lib/cloudinary.js";

export const getuserforSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    // Add last seen information
    const usersWithStatus = filteredUser.map((user) => ({
      ...user.toObject(),
      lastSeen: user.lastSeen || user.createdAt,
      isOnline: user.isOnline || false,
    }));

    res.status(200).json(usersWithStatus);
  } catch (error) {
    console.error("Error in getuserforSidebar controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    })
      .populate("senderId", "fullName profilePic")
      .populate("receiverId", "fullName profilePic")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const SendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl = null;
    if (image && image.trim() !== "") {
      try {
        // Handle base64 image data
        const uploadResponse = await cloudinary.uploader.upload(image, {
          resource_type: "auto",
          folder: "chat_images",
        });
        imageUrl = uploadResponse.secure_url;
        console.log("Image uploaded successfully:", imageUrl);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(400).json({ message: "Failed to upload image" });
      }
    }

    const newMessage = new Message({
      text: text || "",
      image: imageUrl,
      senderId,
      receiverId,
    });

    const savedMessage = await newMessage.save();

    // Populate the message with sender details
    const populatedMessage = await Message.findById(savedMessage._id)
      .populate("senderId", "fullName profilePic")
      .populate("receiverId", "fullName profilePic");

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Error in SendMessages controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
