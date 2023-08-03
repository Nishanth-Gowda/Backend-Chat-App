const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
  try {
    const { text, sender, chatRoom } = req.body;
    const message = new Message({ text, sender, chatRoom });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Could not create the message.' });
  }
};

exports.getMessagesByChatRoom = async (req, res) => {
  try {
    const chatRoomId = req.params.id;
    const messages = await Message.find({ chatRoom: chatRoomId }).populate('sender', 'name');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch messages.' });
  }
};
