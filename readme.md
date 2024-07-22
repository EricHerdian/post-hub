# Post-Hub

## Overview

Post-Hub is a full-stack web application designed to manage and interact with blog posts. It features a client-side application built with Next.js and a server-side API developed using Express.js. The application provides functionalities for user authentication, blog post management, and responsive design.

## Features

- **User Authentication**: Register and log in with JWT-based authentication.
- **Blog Management**: Create, read, update, and delete blog posts.
- **Responsive Design**: Accessible and optimized for both mobile and desktop devices.
- **Client-Server Architecture**: Separate client and server components for clear separation of concerns.

## Technologies Used

- **Client**: React, Next.js, Tailwind CSS
- **Server**: Express.js, MySQL
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

- `client/`: Contains the Next.js frontend application, including pages, components, and styles.
- `server/`: Contains the Express.js backend server, including API routes, models, and database connections.

## Installation

**Clone the Repository**:
   Clone the repository from GitHub to your local machine:
   ```bash
   git clone https://github.com/EricHerdian/post-hub.git
   cd post-hub/server
  ```

### Server Setup

1. **Navigate to the Server Directory**:
   ```bash
   cd post-hub/server
   ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Update the Port Configuration**: <br>
   Change the port in server/config/config.json:
   ```bash
   {
     "development": {
       "username": "root",
       "password": "your_mysql_password", (default: "")
       "database": "posthub",
       "host": "127.0.0.1",
       "dialect": "mysql",
       "port": your_mysql_port (default: 3306)
     }
   }
   ```

4. **Ensure MySQL Server or XAMPP is Running**: <br>
   Make sure that your MySQL server or XAMPP is up and running.

5. **Create the Database**: <br>
   Use a MySQL client or XAMPP's phpMyAdmin to create a database named 'posthub'. <br>
   Here's a basic SQL command you can use:
   ```bash
    CREATE DATABASE posthub;
    ```

6. **Start the Server**:
   ```bash
    npm start
    ```

### Client Setup
1. **Navigate to the Server Directory**:
   ```bash
   cd post-hub/client
   ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
