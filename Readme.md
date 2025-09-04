User Management Dashboard
A full-stack web application for managing users with Create, Read, Update, Delete (CRUD) functionality using React, Node.js, Express, and MongoDB.

Setup Instructions
Prerequisites:-

1.Node.js and npm installed (Download Node.js)
2.MongoDB server installed and running locally or accessible via network

Backend Setup:-
1.Navigate to the backend directory (e.g., server):

cd server
Install backend dependencies:

npm install
2.Make sure MongoDB is running locally (default port 27017), or update MongoDB connection URI in server.js.

Start the backend server:
node server.js
The server will run by default on http://localhost:5000.

Frontend Setup
Navigate to the frontend directory (e.g., client):

cd client

Install frontend dependencies:
npm install
Start the React development server:

npm start
The frontend will run on http://localhost:3000 by default.

Usage:-
1.Open the frontend URL http://localhost:3000 in your browser.
2.Use the dashboard to view, search, add, edit, and delete users.
3.All changes are persisted in the MongoDB backend.

Tech Stack:-
Frontend: React, React Router, Axios, Bootstrap.
Backend: Node.js, Express.js
Database: MongoDB with Mongoose 
Dev Tools: VS Code or any text editor, Postman for API testing (optional)

Screenshots:-
1.User Dashboard-(image-1.png)
2.Add User - image.png
3.View User - image-2.png
4.Edit User - image-3.png

User dashboard with search, sort, and pagination
Form for adding or editing users with validation

Folder Structure:-

root/
│
├── server/           # Backend code (Express, Mongoose)
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── client/           # Frontend React app
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── api.js
    │   └── App.js
    └── package.json
Future Improvements
Add user authentication and role-based access control
Implement pagination on user lists for better performance with large data sets
Enhance UI/UX with additional animations and themes