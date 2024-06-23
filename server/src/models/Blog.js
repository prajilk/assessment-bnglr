const { Schema, model, models } = require('mongoose');

const blogSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    summary: {
        type: String,
        required: true,
    },
    image: { type: String },
    content: { type: String, required: true },
}, { timestamps: true, versionKey: false });

module.exports = models.Blog || model('Blog', blogSchema);