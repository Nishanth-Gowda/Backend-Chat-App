const mongoose = require('mongoose');
const ChatRoom = require('../models/ChatRoom');

exports.createChatRoom = async (req, res) => {
  try {
    const { topic, createdBy } = req.body;
    const chatRoom = new ChatRoom({ topic, createdBy, participants: [createdBy] });
    await chatRoom.save();
    res.status(201).json(chatRoom);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ error: 'Could not create the chat room.' });
  }
};

exports.getAllChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find().populate('createdBy', 'name');
    res.json(chatRooms);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ error: 'Could not fetch chat rooms.' });
  }
};

exports.joinChatRoom = async (req, res) => {
  try {
    const chatRoomId = req.params.id;
    const userId = req.body.userId;

    // Check if chatRoomId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(chatRoomId)) {
      return res.status(400).json({ error: 'Invalid chat room ID' });
    }

    const chatRoom = await ChatRoom.findById(chatRoomId);

    if (!chatRoom) {
      return res.status(404).json({ error: 'Chat room not found' });
    }

    if (chatRoom.participants.includes(userId)) {
      return res.status(400).json({ error: 'User is already a participant in this chat room' });
    }

    chatRoom.participants.push(userId);
    await chatRoom.save();

    res.json(chatRoom);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ error: 'Could not join the chat room.' });
  }
};
