import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    status: {
        type: String,
        enum: ["Planning", "Active", "Completed"],
        default: "Planning",
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
}
);
export default mongoose.model('Project', projectSchema);