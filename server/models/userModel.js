const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },  // 'required' instead of 'require'
    email: { 
        type: String, 
        required: true, 
        unique: true, // Ensure email uniqueness
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] // Basic email validation
    },
    password: { 
        type: String, 
        required: true,
        minlength: 6 // Ensure password has a minimum length
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
