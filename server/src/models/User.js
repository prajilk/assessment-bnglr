const { Schema, model, models } = require('mongoose');

const userSchema = new Schema({
    fullname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    emailToken: { type: String },
}, { timestamps: true, versionKey: false });

module.exports = models.User || model('User', userSchema);