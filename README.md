
# Chat Application Backend

The Chat Application Backend is a Node.js application that facilitates real-time communication through chat rooms. It employs Express.js to handle API requests and enable instant messaging. MongoDB serves as the database for storing user profiles, chat rooms, and messages. The architecture adheres to the MVC (Model-View-Controller) pattern for clear separation of concerns and scalability.

## Features

- User registration with name, email, and profile picture.
- Creation of new chat rooms with topics.
- Real-time messaging using Socket.io.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chat-app-backend.git
   cd chat-app-backend
2. Install dependencies:

     ```bash
     npm install

3. Set up MongoDB:

Ensure that MongoDB is installed and running on your local machine.
Update the MongoDB connection URL in server.js to match your local MongoDB setup.

Start the server:

    npm start
    The API will be accessible at http://localhost:3000.

4. API Endpoints
    ```
    #Create a New User
    URL: /api/users

    Method: POST

    Request Body:

    {
        "name": "John Doe",
        "email": "john@example.com",
        "profilePic": "profile.jpg"
    }

    Response:

    {
        "_id": "64be14655d4a0a4b7de261f8",
        "name": "John Doe",
        "email": "john@example.com",
        "profilePic": "profile.jpg",
        "__v": 0
    }


    Create a New Chat Room
    URL: /api/chatrooms

    Method: POST

    Request Body:

    {
        "topic": "General",
        "createdBy": "64be14655d4a0a4b7de261f8"
    }
    Response:

    {
        "_id": "64be14655d4a0a4b7de261fa",
        "topic": "General",
        "createdBy": {
            "_id": "64be14655d4a0a4b7de261f8",
            "name": "John Doe",
            "email": "john@example.com",
            "profilePic": "profile.jpg",
            "__v": 0
    },
        "participants": ["64be14655d4a0a4b7de261f8"],
        "__v": 0
    }
    Get all chat rooms
    URL: /api/chatrooms

    Method: GET

    Response:
    [
        {
            "_id": "64be14655d4a0a4b7de261fa",
            "topic": "General",
            "createdBy": {
                "_id": "64be14655d4a0a4b7de261f8",
                "name": "John Doe",
                "email": "john@example.com",
                "profilePic": "profile.jpg",
                "__v": 0
        },
        "participants": ["64be14655d4a0a4b7de261f8"],
        "__v": 0
        },
        // More chat rooms...
    ]
    Join a chat room
    URL: /api/chatrooms/:id/join

    Method: POST

    Request body:

        {
        "userId": "64be14655d4a0a4b7de261f9"
        }
    Response:

    {
    "_id": "64be14655d4a0a4b7de261fa",
    "topic": "General",
    "createdBy": {
        "_id": "64be14655d4a0a4b7de261f8",
        "name": "John Doe",
        "email": "john@example.com",
        "profilePic": "profile.jpg",
        "__v": 0
    },
    "participants": ["64be14655d4a0a4b7de261f8", "64be14655d4a0a4b7de261f9"],
    "__v": 0
    }
    Create a new message
    URL: /api/messages

    Method: POST

    Request body:

    {
    "text": "Hello, everyone!",
    "sender": "64be14655d4a0a4b7de261f8",
    "chatRoom": "64be14655d4a0a4b7de261fa"
    }
    Response:

    {
    "_id": "64be14655d4a0a4b7de261fc",
    "text": "Hello, everyone!",
    "sender": {
        "_id": "64be14655d4a0a4b7de261f8",
        "name": "John Doe",
        "email": "john@example.com",
        "profilePic": "profile.jpg",
        "__v": 0
    },
    "chatRoom": "64be14655d4a0a4b7de261fa",
    "__v": 0
    }
    Get messages by chat room
    URL: /api/messages/:id

    Method: GET

    Response:
    [
    {
        "_id": "64be14655d4a0a4b7de261fc",
        "text": "Hello, everyone!",
        "sender": {
        "_id": "64be14655d4a0a4b7de261f8",
        "name": "John Doe",
        "email": "john@example.com",
        "profilePic": "profile.jpg",
        "__v": 0
        },
        "chatRoom": "64be14655d4a0a4b7de261fa",
        "__v": 0
    },
    // More messages...
    ]



