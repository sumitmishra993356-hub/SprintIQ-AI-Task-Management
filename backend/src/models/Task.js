import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },

    status: {
        type: String,
        enum: ["Todo", "In Progress", "Review", "Done"],
        default: "Todo",
    },

    dueDate: {
        type: Date,
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
}, {
    timestamps: true
}
);
export default mongoose.model('Task', taskSchema);