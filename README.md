<<<<<<< HEAD
# Chat Backend

Node.js + TypeScript + PostgreSQL (Prisma) + Firebase Firestore chat backend.

## Features

- Create/get 1:1 chats
- Send messages to Firestore
- Fetch chat messages
- Mark messages as read
- Update per-user last-seen message
- Get a user's chats from PostgreSQL
- Strict TypeScript configuration
- Prisma ORM
- Firebase Admin SDK
- Centralized error middleware
- Environment-based configuration

## Project structure

```text
chat-backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── firebase.ts
│   ├── controllers/
│   │   ├── chat.controller.ts
│   │   ├── message.controller.ts
│   │   └── user.controller.ts
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── repositories/
│   │   ├── chat.repository.ts
│   │   └── user.repository.ts
│   ├── routes/
│   │   ├── chat.routes.ts
│   │   ├── message.routes.ts
│   │   └── user.routes.ts
│   ├── services/
│   │   ├── chat.service.ts
│   │   ├── message.service.ts
│   │   └── user.service.ts
│   ├── types/
│   │   ├── chat.types.ts
│   │   ├── message.types.ts
│   │   └── user.types.ts
│   ├── utils/
│   │   ├── errors.ts
│   │   └── response.ts
│   ├── validators/
│   │   ├── chat.validator.ts
│   │   └── message.validator.ts
│   ├── app.ts
│   └── server.ts
├── prisma/
│   └── schema.prisma
├── firebase/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure PostgreSQL

Put your Neon/PostgreSQL connection string in `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
```

### 3. Configure Firebase

Create a Firebase project and enable Firestore.

Then put these values in `.env`:

```env
FIREBASE_PROJECT_ID="..."
FIREBASE_CLIENT_EMAIL="..."
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Create database tables

```bash
npx prisma migrate dev --name init
```

### 6. Start the server

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Production:

```bash
npm start
```

Health check:

```text
GET http://localhost:5000/health
```

## API endpoints

### Create chat

```text
POST /chat/create
```

Body:

```json
{
  "userAId": "USER_ID_1",
  "userBId": "USER_ID_2"
}
```

### Send message

```text
POST /chat/:chatId/message/send
```

Body:

```json
{
  "senderId": "USER_ID_1",
  "text": "Hello"
}
```

### Get messages

```text
GET /chat/:chatId/messages?limit=50
```

### Mark message as read

```text
POST /chat/:chatId/message/:messageId/read
```

Body:

```json
{
  "userId": "USER_ID_2"
}
```

### Update last seen

```text
POST /chat/:chatId/lastseen
```

Body:

```json
{
  "userId": "USER_ID_2",
  "messageId": "MESSAGE_ID"
}
```

### Get user's chats

```text
GET /user/:userId/chats
```

## Data responsibility

PostgreSQL:
- Users
- Chats
- Chat members

Firestore:
- Messages
- Read receipts
- Last-seen state

## Important

The `.env` file in this ZIP contains placeholders only. Replace them with your actual Neon and Firebase credentials before running the application. Never commit real credentials to Git.
=======
# chat-backend
>>>>>>> 213942156a85d35310ad431acb8742109a33360a
