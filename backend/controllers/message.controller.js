import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/Cloudinary.js";
import { getReciverSocketId,io } from "../lib/socket.js";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
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
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body; // Extract text and image from the request body
    const { id: receiverId } = req.params; // Get receiver ID from the URL params
    const senderId = req.user._id; // Get sender ID from the authenticated user's session

    let imageUrl;

    if (image) {
      // Check if the image size exceeds 7MB (7 * 1024 * 1024 bytes)
      const imageSize = Buffer.byteLength(image, "base64"); // Get image size in bytes
      if (imageSize > 7 * 1024 * 1024) {
        return res
          .status(400)
          .json({ error: "Image file is too large. Max size is 7MB." });
      }

      // Upload the base64 image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image, {
        // Optionally add more options here like cropping, transformations, etc.
      });
      imageUrl = uploadResponse.secure_url; // Get the uploaded image's URL
    }

    // Create a new message object
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl || null, // If no image, store null
    });

    // Save the message to the database
    await newMessage.save();
    const ReciverSocketId = getReciverSocketId(receiverId);
    if (ReciverSocketId) {
      io.to(ReciverSocketId).emit("newMessage", newMessage);
    }
    // Respond with the new message object
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
