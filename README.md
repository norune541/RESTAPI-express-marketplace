# Marketplace REST API

Backend API for a classifieds platform where users can create, manage, and browse adverts. Built as a pet project using Node.js, Express, MySQL, and Prisma.

---

## 🚀 Tech Stack

- Node.js (ESM)
- Express.js
- MySQL
- Prisma ORM
- TypeScript
- Zod (validation)
- JWT Authentication
- bcrypt (password hashing)
- Swagger (OpenAPI 3.0)

---

## Features

### Auth

- User registration & login
- JWT-based authentication
- Logout (...)

### Users

- Get current user profile
- Update profile

### Adverts

- Create, update, delete adverts
- Status workflow (draft → moderation → published → archived)
- Filtering (category, price range, search query)
- Pagination & sorting
- Paid promotion services (VIP / TOP)

### Categories

- List categories

---

## Architecture

- REST API built with Express
- Prisma handles DB layer
- Zod validates incoming requests
- JWT used for auth middleware
- Role-based access (user / moderator)

---

## 📄 API Documentation

Swagger UI available at:

http://localhost:3000/api/docs

---

## Setup

### 1. Clone repository

```bash
git clone https://github.com/DevelopmentKen1/RESTAPI-express-marketplace.git
cd RESTAPI-express-marketplace
```

### 2. Instal dependencies

```bash
npm install
```

### 3. Setup environment variables

Create .env file:

```bash
DATABASE_URL=mysql://user:password@localhost:3306/adverts
JWT_SECRET=your_secret_key
PORT=3000
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start development server

```bash
npm run dev
```

## Build

```bash
npm run build
npm run start
```
