const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        species: { type: String, required: true},
        location: { type: String, default: "n/a"},
        description: { type: String, required: true},
    } , { timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);