import mongoose from 'mongoose';

export const SchemaCommand = new mongoose.Schema({
    message: {
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
    time: {
        rotate: {
            type: Boolean
        },
        timer: {
            type: Number
        }
    },
    date: {
        type: String,
        required: true
    }
});