
# MERN Assessment Banglore

This project is a full-stack application built using the MERN stack (MongoDB, Express, React, Node.js).

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Setting Up Less Secure Email Password for Nodemailer](#setting-up-less-secure-email-password-for-nodemailer)
- [Running the Project](#running-the-project)
- [Technologies Used](#technologies-used)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/prajilk/assessment-bnglr.git
    cd assessment-bnglr
    ```

2. **Install server dependencies:**

    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies:**

    ```bash
    cd ../client
    npm install
    ```

## Environment Variables

Create `.env` files in both the `server` and `client` directories with the following configurations:

### Server `.env` file (server/.env)

```
MONGODB_URI = mongodb://127.0.0.1:27017/simple-blog
JWT_SECRET_KEY = jwt_secret
EMAIL = your_email
PASSWORD = your_less_secure_email_passowrd
CLIENT_URL = http://localhost:5173
```

### Client `.env` file (client/.env)

```
VITE_SERVER_URL = http://localhost:8000
```

## Setting Up Less Secure Email Password for Nodemailer

### Step 1: Enable Less Secure App Access
1. Log in to your Gmail account.

2. Go to your Google Account settings by visiting My Account.

3. Search "app password" in the Search bar and enter

4. Enter password

5. Type the name for the app-specific password and click create

6. Done, copy the password and paste it in the environment

## Running the Project

### Run the server:

Open a terminal and navigate to the server directory, then start the server:

```
cd server && npm run dev
```
### Run the client:

Open another terminal and navigate to the client directory, then start the client:

```
cd client && npm run dev
```
### Access the application:

Open your browser and navigate to http://localhost:5173.

## Technologies Used
### Fronend:
- React (Vite)
- React-Query for data fetching
- Axios
- Redux for state management
- Tailwindcss for styling
- Shadcn for UI Components
- React Quill for text formatting in blog posts
- Lucide-react for icons
- Google fonts
### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Nodemailer for sending mails
- Handlerbars for email templates
