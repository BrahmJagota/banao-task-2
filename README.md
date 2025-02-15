# Fullstack Project Setup Guide

This README provides a detailed guide for setting up and running a fullstack project with a React frontend (Vite) and a Node.js backend (Express). The backend uses TypeScript, AWS S3 for file storage, MongoDB for the database, and session-based authentication.

---

## Prerequisites

Make sure you have the following installed on your system:

1. **Node.js** (v16 or later)
2. **npm** or **pnpm** as the package manager (pnpm is recommended):
   - Install `pnpm` globally if not already installed:
     ```bash
     npm install -g pnpm
     ```
3. **MongoDB**: Set up a MongoDB instance (local or cloud, e.g., MongoDB Atlas).
4. **AWS Account**: Configure an S3 bucket for file storage.

---

## Project Structure

```plaintext
project-root/
├── frontend/      # React Vite app
├── server/        # Node.js Express app
└── README.md
```

---

## Frontend Setup (React with Vite)

### 1. Navigate to the Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
Use either `pnpm` or `npm`:

#### Using `pnpm`:
```bash
pnpm install
```

#### Using `npm`:
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `frontend/` directory and add the following:
```env
VITE_API_BASE_URL=http://localhost:3000
```
- `VITE_API_BASE_URL`: URL pointing to the backend server.

### 4. Start the Development Server
Run the following command to start the React development server:

#### Using `pnpm`:
```bash
pnpm run dev
```

#### Using `npm`:
```bash
npm run dev
```

The frontend server will start at `http://localhost:5173` by default.

---

## Backend Setup (Node.js with Express)

### 1. Navigate to the Server Directory
```bash
cd server
```

### 2. Install Dependencies
Use either `pnpm` or `npm`:

#### Using `pnpm`:
```bash
pnpm install
```

#### Using `npm`:
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `server/` directory and add the following:
```env
# Server Configuration
SESSION_SECRET=your_secret_key
MONGODB_URI=your_mongo_connection_string
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET_NAME=your_bucket_name
BASE_URL=http://localhost:3000
```
- `SESSION_SECRET`: A secret key for session management.
- `MONGODB_URI`: Connection string for your MongoDB database.
- `AWS_ACCESS_KEY` and `AWS_SECRET_KEY`: AWS credentials.
- `AWS_BUCKET_NAME`: The name of your S3 bucket.

### 4. Start the Development Server
To run the project in development mode:

#### Using `pnpm`:
```bash
pnpm run dev
```

#### Using `npm`:
```bash
npm run dev
```

The backend server will start at `http://localhost:3000` by default.

---

### MongoDB Setup
Ensure your MongoDB connection is configured correctly in `.env`. Use MongoDB Atlas for cloud-hosted databases or a local MongoDB instance.

### Vite Note
For environment variables in Vite, prefix them with `VITE_` and access them via `import.meta.env`. Example:
```ts
console.log(import.meta.env.VITE_API_BASE_URL);
```

---
