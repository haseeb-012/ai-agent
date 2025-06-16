# AI-Powered Ticket Management System

A Node.js application that leverages Google's Gemini AI to automatically analyze support tickets, determine priority levels, identify required skills, and assign tickets to qualified team members.

## Features

- 🔐 **User Authentication** - Secure signup, login, and JWT-based authorization
- 👥 **Role-Based Access** - Different permissions for users, moderators, and admins
- 🤖 **AI Ticket Analysis** - Automatic summarization, prioritization, and skill identification
- 📝 **Ticket Management** - Create, view, and track support tickets
- 📧 **Email Notifications** - Automatic emails for account creation and ticket assignments
- 🔄 **Event-Driven Architecture** - Background processing via Inngest

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **AI**: Google Gemini 1.5 via @inngest/agent-kit
- **Email**: Nodemailer with Mailtrap
- **Background Jobs**: Inngest

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create `.env` file with required environment variables (see `.env.sample`)
4. Start the development server:
   ```
   npm run dev
   ```
5. Start the Inngest development server:
   ```
   npm run inngest-dev
   ```

## Environment Variables

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your_mailtrap_username
MAILTRAP_SMTP_PASSWORD=your_mailtrap_password

APP_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Authenticate a user
- `POST /api/auth/logout` - Logout a user

### User Management
- `GET /api/auth/users` - Get all users (admin only)
- `POST /api/auth/update-user` - Update user details (admin only)

### Tickets
- `POST /api/tickets` - Create a new ticket
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get a specific ticket

## License

ISC
