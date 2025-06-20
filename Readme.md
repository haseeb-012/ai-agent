# 🚀 AI-Powered Ticket Management System

An intelligent support ticket platform leveraging Google's Gemini AI to analyze tickets, determine priority levels, identify required skills, and streamline support workflows.

## ✨ Key Features

- **🔒 User Authentication & Security**
  - Secure signup and login with JWT-based authorization
  - Password encryption with bcrypt
  - Protected API endpoints and route guards

- **👤 Role-Based Access Control**
  - Custom permissions for users, support agents, and administrators
  - Resource-level access restrictions
  - Conditional UI rendering based on permissions

- **🤖 AI-Powered Analysis**
  - Automatic ticket categorization and summarization
  - Smart priority assignment (Low, Medium, High)
  - Technical skill identification for better routing
  - Context-aware ticket insights

- **🎫 Complete Ticket Management**
  - Create, view, and track support tickets
  - Real-time status updates
  - Detailed ticket history
  - Markdown support for rich formatting

- **📬 Smart Notifications**
  - Automated email alerts for account creation
  - Assignment notifications for support agents
  - Status change updates
  - Configurable notification preferences

- **⚡ Event-Driven Architecture**
  - Background processing with Inngest
  - Reliable job execution
  - Scalable event handling
  - Non-blocking operations

## 🛠️ Technology Stack

| Component | Technologies |
|-----------|-------------|
| **Backend** | Node.js, Express.js |
| **Frontend** | React, React Router, TailwindCSS, DaisyUI |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT, bcrypt |
| **AI Engine** | Google Gemini 1.5 via @inngest/agent-kit |
| **Email Service** | Nodemailer, Mailtrap |
| **Job Processing** | Inngest |

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- MongoDB database
- Google AI API key for Gemini

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ai-ticket-assistance.git
   cd ai-ticket-assistance
   ```

2. Install dependencies for both backend and frontend
   ```bash
   # Install backend dependencies
   cd ai-ticket-backend
   npm install

   # Install frontend dependencies
   cd ../ai-ticket-frontend
   npm install
   ```

3. Create environment files
   ```bash
   # Backend .env file (in ai-ticket-backend folder)
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   MAILTRAP_SMTP_HOST=your_smtp_host
   MAILTRAP_SMTP_PORT=your_smtp_port
   MAILTRAP_SMTP_USER=your_smtp_user
   MAILTRAP_SMTP_PASS=your_smtp_password
   
   # Frontend .env file (in ai-ticket-frontend folder)
   VITE_SERVER_URL=http://localhost:5000/api
   ```

4. Start the services
   ```bash
   # Run backend server (in ai-ticket-backend folder)
   npm run dev

   # Run Inngest for background jobs (in a new terminal, ai-ticket-backend folder)
   npm run inngest-dev
   
   # Run frontend dev server (in a new terminal, ai-ticket-frontend folder)
   npm run dev
   ```

5. Access the application
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api
   - Inngest Dashboard: http://localhost:8288

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT token generation |
| `MAILTRAP_SMTP_HOST` | SMTP host for email delivery |
| `MAILTRAP_SMTP_PORT` | SMTP port |
| `MAILTRAP_SMTP_USER` | SMTP username |
| `MAILTRAP_SMTP_PASS` | SMTP password |

### Frontend (.env)
| Variable | Description |
|----------|-------------|
| `VITE_SERVER_URL` | Backend API URL (e.g., http://localhost:5000/api) |

## 📋 System Architecture

```
┌─────────────────┐      ┌───────────────┐      ┌────────────────┐
│                 │      │               │      │                │
│  React Frontend │◄────►│  Express API  │◄────►│  MongoDB       │
│                 │      │               │      │                │
└─────────────────┘      └───────┬───────┘      └────────────────┘
                                ▲
                                │
                                ▼
┌─────────────────┐      ┌───────────────┐      ┌────────────────┐
│                 │      │               │      │                │
│  Inngest        │◄────►│  Gemini AI    │      │  Email Service │
│                 │      │               │◄────►│                │
└─────────────────┘      └───────────────┘      └────────────────┘
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/users` - Get all users (admin only)
- `POST /api/auth/update-user` - Update user details (admin only)

### Tickets
- `GET /api/tickets` - Get all tickets
- `POST /api/tickets` - Create a new ticket
- `GET /api/tickets/:id` - Get ticket by ID
- `PUT /api/tickets/:id` - Update a ticket
- `DELETE /api/tickets/:id` - Delete a ticket

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **User** | Create and view own tickets |
| **Moderator** | View and update assigned tickets |
| **Admin** | Full access to all tickets and user management |

## 🔄 Workflow

1. User creates a support ticket
2. Inngest triggers an AI analysis function
3. Gemini AI analyzes the ticket content to determine:
   - Priority level
   - Required technical skills
   - Summary and key points
4. System assigns ticket to the most appropriate moderator based on skills
5. Email notifications sent to both user and assigned moderator
6. Moderator addresses the ticket and updates status
7. User receives notification on ticket resolution

## 📚 Further Development

- Add real-time chat functionality
- Implement service level agreement (SLA) tracking
- Create a comprehensive dashboard for analytics
- Add support for file attachments on tickets
- Implement a knowledge base integration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Google Gemini AI](https://ai.google.dev/) for powering the intelligent ticket analysis
- [Inngest](https://www.inngest.com/) for event-driven background processing
- [React](https://reactjs.org/) and [TailwindCSS](https://tailwindcss.com/) for the frontend
- [Express.js](https://expressjs.com/) for the backend API
- [MongoDB](https://www.mongodb.com/) for the database

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT token generation |
| `MAILTRAP_SMTP_HOST` | SMTP host for email delivery |
| `MAILTRAP_SMTP_PORT` | SMTP port |
| `MAILTRAP_SMTP_USER` | SMTP username |
| `MAILTRAP_SMTP_PASS` | SMTP password |

### Frontend (.env)
| Variable | Description |
|----------|-------------|
| `VITE_SERVER_URL` | Backend API URL (e.g., http://localhost:5000/api) |

## 📋 System Architecture

```
┌─────────────────┐      ┌───────────────┐      ┌────────────────┐
│                 │      │               │      │                │
│  React Frontend │◄────►│  Express API  │◄────►│  MongoDB       │
│                 │      │               │      │                │
└─────────────────┘      └───────┬───────┘      └────────────────┘
                                ▲
                                │
                                ▼
┌─────────────────┐      ┌───────────────┐      ┌────────────────┐
│                 │      │               │      │                │
│  Inngest        │◄────►│  Gemini AI    │      │  Email Service │
│                 │      │               │◄────►│                │
└─────────────────┘      └───────────────┘      └────────────────┘
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/users` - Get all users (admin only)
- `POST /api/auth/update-user` - Update user details (admin only)

### Tickets
- `GET /api/tickets` - Get all tickets
- `POST /api/tickets` - Create a new ticket
- `GET /api/tickets/:id` - Get ticket by ID
- `PUT /api/tickets/:id` - Update a ticket
- `DELETE /api/tickets/:id` - Delete a ticket

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **User** | Create and view own tickets |
| **Moderator** | View and update assigned tickets |
| **Admin** | Full access to all tickets and user management |

## 🔄 Workflow

1. User creates a support ticket
2. Inngest triggers an AI analysis function
3. Gemini AI analyzes the ticket content to determine:
   - Priority level
   - Required technical skills
   - Summary and key points
4. System assigns ticket to the most appropriate moderator based on skills
5. Email notifications sent to both user and assigned moderator
6. Moderator addresses the ticket and updates status
7. User receives notification on ticket resolution

## 📚 Further Development

- Add real-time chat functionality
- Implement service level agreement (SLA) tracking
- Create a comprehensive dashboard for analytics
- Add support for file attachments on tickets
- Implement a knowledge base integration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Google Gemini AI](https://ai.google.dev/) for powering the intelligent ticket analysis
- [Inngest](https://www.inngest.com/) for event-driven background processing
- [React](https://reactjs.org/) and [TailwindCSS](https://tailwindcss.com/) for the frontend
- [Express.js](https://expressjs.com/) for the backend API
- [MongoDB](https://www.mongodb.com/) for the database

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
