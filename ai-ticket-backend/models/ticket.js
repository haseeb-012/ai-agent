import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        default: 'TODO'
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTO:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    priority: String,
    deadline:Date,
    helpfulNotes:String,
    relatedSkills: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },

})
const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;