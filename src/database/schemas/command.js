import mongoose from 'mongoose';

export const SchemaCommand = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    func: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});