# Backend Setup with Node.js, Prisma, and MySQL

This README provides instructions for setting up and running the backend server using Node.js, Prisma ORM, and MySQL.

## Prerequisites

- Node.js installed on your machine
- MySQL server installed and running

## Setup Instructions

1. Navigate to the project directory:

```bash
cd <project-directory>

npm install

DATABASE_URL="mysql://username:password@localhost:port/your_database_name"


npx prisma migrate dev

npm run dev
