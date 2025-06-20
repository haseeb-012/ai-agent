import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { serve } from 'inngest/express';
import userRoutes from './routes/user.js';
import ticketRoutes from './routes/ticket.js';
import { inngest } from './inngest/client.js';
import {onSignUp} from './inngest/function/on-SignUp.js';
import {onTicketCreate} from './inngest/function/on-ticket-create.js';



// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/auth', userRoutes);
app.use('/api/tickets', ticketRoutes);

app.use('/api/inngest',serve({
    client: inngest,
    functions: [onSignUp, onTicketCreate],
}))

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        // Exit process with failure
        process.exit(1);
    }
};

// Call the connectDB function
connectDB();

// Basic route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Define your routes here
// Example: app.use('/api/users', userRoutes);



// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});