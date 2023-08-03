const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chatRoomController');

router.post('/chatrooms', chatRoomController.createChatRoom);
router.get('/chatrooms', chatRoomController.getAllChatRooms);
router.post('/chatrooms/:id/join', chatRoomController.joinChatRoom);

module.exports = router;
