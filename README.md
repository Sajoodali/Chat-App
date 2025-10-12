# Chat Application

A modern real-time chat application built with React, Node.js, Express, MongoDB, and Socket.IO.

## Features

- 🔐 **User Authentication** - Sign up, login, and logout functionality
- 💬 **Real-time Messaging** - Instant message delivery using Socket.IO
- 👥 **User Management** - View all users and start conversations
- 🖼️ **Image Sharing** - Send images in chat messages
- 👤 **Profile Management** - Update profile information and pictures
- ⚙️ **Settings** - Account settings and preferences
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS and DaisyUI

## Tech Stack

### Frontend

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **DaisyUI** - Component library
- **Zustand** - State management
- **Socket.IO Client** - Real-time communication
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage
- **CORS** - Cross-origin resource sharing

## Project Structure

```
Chat_App/
├── Frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── UserList.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── AuthImagePattern.jsx
│   │   ├── Pages/               # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── SettingPage.jsx
│   │   ├── store/               # State management
│   │   │   ├── useAuthStore.js
│   │   │   └── useSocketStore.js
│   │   ├── lib/                 # Utilities
│   │   │   └── axios.js
│   │   └── App.jsx
│   └── package.json
└── Backend/
    ├── src/
    │   ├── controllers/         # Route handlers
    │   │   ├── auth.controller.js
    │   │   └── message.controller.js
    │   ├── middleware/          # Custom middleware
    │   │   └── auth.middleware.js
    │   ├── models/              # Database models
    │   │   ├── user.model.js
    │   │   └── message.modle.js
    │   ├── routes/              # API routes
    │   │   ├── auth.route.js
    │   │   └── message.route.js
    │   ├── lib/                 # Utilities
    │   │   ├── db.js
    │   │   ├── cloudinary.js
    │   │   └── utills.js
    │   └── index.js
    └── package.json
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the Backend directory with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the backend server:

```bash
npm run dev
```

The backend server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Messages

- `GET /api/messages/users` - Get all users for sidebar
- `GET /api/messages/:id` - Get messages between users
- `POST /api/messages/send/:id` - Send a message

## Socket.IO Events

### Client to Server

- `sendMessage` - Send a new message
- `joinRoom` - Join a chat room
- `leaveRoom` - Leave a chat room

### Server to Client

- `newMessage` - Receive a new message
- `messageDelivered` - Message delivery confirmation

## Usage

1. **Sign Up/Login**: Create an account or login with existing credentials
2. **Select User**: Choose a user from the sidebar to start chatting
3. **Send Messages**: Type messages and press send or click the send button
4. **Share Images**: Click the attachment icon to share images
5. **Update Profile**: Click on your profile to update information
6. **Settings**: Access account settings and logout

## Features in Detail

### Real-time Messaging

- Messages are delivered instantly using Socket.IO
- Connection status is shown in the header
- Messages are stored in MongoDB for persistence

### Image Sharing

- Upload and share images in chat
- Images are stored using Cloudinary
- Preview images before sending

### User Management

- View all registered users
- Start conversations with any user
- Profile pictures and user information

### Responsive Design

- Mobile-friendly interface
- Adaptive layout for different screen sizes
- Touch-friendly controls

## Development

### Adding New Features

1. Create components in the `components/` directory
2. Add new pages in the `Pages/` directory
3. Update the store for state management
4. Add API endpoints in the backend
5. Update Socket.IO events for real-time features

### Styling

- Uses Tailwind CSS for styling
- DaisyUI components for consistent UI
- Custom CSS classes for specific designs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

Made with ❤️ for better communication
