const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser")
const DBLINK = "mongodb+srv://james:aloha@cluster0.4dqqd.mongodb.net/mushroam?retryWrites=true&w=majority";

mongoose.connect(DBLINK,
    () => {
        console.log("connected to database...");
        app.listen(3000, () => {
            console.log("listening on 3000");
        });
    }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use(morgan("dev"));

const Post = require("./models/Post");

//get post(s)
app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
});

//postcreate
app.post('/posts', async (req, res) => {
    console.log(req.body);

    const post = new Post({
        species: req.body.species,
        location: req.body.location,
        description: req.body.description,
    });
    const savedPost = await post.save();
    res.status(200).send(savedPost);
});

//users
const User = require("./models/User");

app.post('/users/register', async (req, res) => {
    const existUser = await User.findOne({ email: req.body.email });
    console.log(req.body.email);
    if (existUser) {
        return res.status(409).json({ message: "this email exists" });
    } else {
        bcrypt.hash(req.body.password, 10, async (error, hash) => {
            if (error) {
                return res.status(500).json({ error: error })
            } else {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                });
                const savedUser = await user.save();
                res.json(savedUser);
            }
        });
    }
});

//login
app.post('/users/login', async (req, res) => {
    const existUser = await User.findOne({ email: req.body.email });
    if (!existUser) {
        return res.status(401).json({ message: "Your details are incorrect" })
    } else {
        bcrypt.compare(req.body.password, existUser.password, (error, result) => {
            if (error) {
                return res.status(500)({ message: "Your details are incorrect" })
            } else {
                if (result) {
                    const expirationTime = 1 * 60 * 60;
                    const token = jwt.sign({ id: existUser._id, email: existUser.email }, "password", { expiresIn: expirationTime });

                    res.cookie("jwt", token, { maxAge: expirationTime * 1000, httpOnly: true });
                    res.status(200).json({ email: existUser.email })
                } else {
                    res.status(401).json({ message: "Your details are incorrect" });

                }
            }
        });
    }
});

// logout
app.get("/users/logout", async (req, res) => {
    res.cookie("jwt", "", {maxAge: 1});
    res.json({message: "logged out"});
})







