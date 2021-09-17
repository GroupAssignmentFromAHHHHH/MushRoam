const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb+srv://james:hello@cluster0.4dqqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
},
    () => {
        console.log("connected to db...");
        app.listen(3000, () => {
            console.log("listening on 3000");
        });
    }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const Post = require("./models/Post.js");

app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
});

app.post('/posts', async (req, res) => {
    const post = new Post({
        species: req.body.species,
        location: req.body.location,
        description: req.body.description,
    });
    const savedPost = await post.save();
    res.status(200).send(savedPost);
});

