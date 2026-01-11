# Mini-Amazon-Service-Backend

A light-weight e-commerce service middleware built with **Express.js**, **TypeScript**, and **JWT-based authentication** under REST API. This project provides a standard authorzation/authentication service for handling user/admin behavior as well as several APIs provided for manage and display products of e-commerce shop. Stroage achieved with MongoDB.

---

## Tech Stack

- **Runtime:** Node.js 18+
- **Language:** TypeScript
- **Framework:** Express.js
- **Auth:** JSON Web Tokens (JWT)

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm / pnpm / yarn

### Installation

```bash
git clone https://github.com/juliachencs/MiniAmazon/tree/dev-phase1/mini-amazon-backend
cd mini-amazon-backend
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5200
NODE_ENV=development
JWT_SECRET=somethingsupersecret
```

---

## Running the Application

```bash
npm run dev       # start development server
npm run build     # build for production
npm start         # run production build
```

The server will be available at:

```
http://localhost:5200
```

---

## Project Structure

```text
src/
├── app.ts                # Express app setup
├── server.ts             # App entry point
├── routes/               # Route definitions
├── controllers/          # HTTP controllers
├── services/             # Business logic
├── models/               # Database Schemas
├── middlewares/          # Auth, error handling, etc.
├── errors/               # Custom error classes
├── config/               # Environment & app config
├── utils/                # Helper utilities
└── types/                # Shared TypeScript types
```

---

## Authentication & Authorization

### JWT Authentication

- Tokens are issued on successful login
- Tokens are expected in the `Authorization` header

```http
Authorization: Bearer <jwt-token>
```

### Role-Based Access Control (RBAC)

Roles are embedded in the JWT payload and enforced via middleware.

Example roles:

```ts
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}
```

---

## Error Handling

The API uses **centralized error handling**.

### Error Flow

- Services/controllers throw custom errors
- Errors extend a base `HttpError`
- A single error-handling middleware formats responses

Example error response:

```json
{
  "message": "Unauthorized"
}
```

Operational errors return appropriate HTTP status codes. Unexpected errors are logged and return `500 Internal Server Error`.

---

## License

MIT License

---
