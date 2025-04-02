# Music Booking API

This repository contains a GraphQL API for a Music Booking App. It handles artist profiles, event listings, and booking transactions.

## Features

- **GraphQL API** with queries and mutations.
- **Secure endpoints** using JWT authentication.
- **Relational database schema** for artists, events, users, and bookings.
- **Postman collection** provided for testing all endpoints.

## Repository Structure

## API Setup

1. Install Dependencies
Make sure you have Node.js installed. Then, in your project's root directory, run:
```bash
npm install
```
This will install all required packages as specified in your package.json.

2. Configure Environment Variables
Ensure that you have your `.env` file set up with the correct configuration values (database credentials, port, JWT secret, etc.). The application will read these values on startup.
```bash
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=music_booking_db
JWT_SECRET=your_jwt_secret
```

3. Set Up the Database
If you haven't done so already:

Start your PostgreSQL server.
Run the SQL script located in src/models/schema.sql to create the necessary tables. You can execute it using the psql command:

```bash
psql -U your_db_user -d music_booking_db -f src/models/schema.sql
```
Replace your_db_user and music_booking_db with the appropriate values.

4. Authentication Token Pre-setup:
For Authentication JWT authentication is implemented. A token is already created to access the endpoints
Please use below secrets and token to authenticate, this can be generated at your end as well
```bash
JWT_SECRET=mySuperSecureSecretKey123!
```
Use Below token for postman JWT env variable:
```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYXR0c29wYWwiLCJwYXNzd29yZCI6InRlc3QxMjMhIn0.LmlaMAQ9mJDWF4qOhKWvpgLeIivYJ2LZYciUuE-FhmE
```

5. Start the Server
Run the server with:

```bash
node src/server.js
```
You should see a message similar to:

Server is running at http://localhost:4000/graphql

6. Use Below collection on postman to call some of the endpionts:
```bash
https://hypercare-api.postman.co/workspace/New-Team-Workspace~2dd4dd5c-6057-4f5d-9644-ed7f45ec9180/collection/16017026-01341a5d-a0f0-406c-b873-f4e70e7eb140?action=share&creator=16017026
```


7. Update below Envirnomenet Variables:
```bash
JWT:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYXR0c29wYWwiLCJwYXNzd29yZCI6InRlc3QxMjMhIn0.LmlaMAQ9mJDWF4qOhKWvpgLeIivYJ2LZYciUuE-FhmE

hostname: http://localhost:4000
```
