const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        description: { type: String, required: true},
        species: { type: String, required: true},
        location: { type: String, default: "null"},
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
       
    } , { timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);