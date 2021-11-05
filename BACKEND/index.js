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


//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(morgan("dev"));
app.use(cookie());

const authUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        console.log("no token");
        return res.json(401).json({ message: "access denied" });
    } else {
        jwt.verify(token, "secretKey", (error, decodedToken) => {
            if (error) {
                console.log(error);
                return res.status(401).json({ message: error.message })
            } else {
                req.userId = decodedToken.id;
                next();
            }
        });
    }
};

//get post(s)
const Post = require("./models/Post");
app.get('/posts', async (req, res) => {
    const posts = await Post.find().populate('author', 'username');
    res.status(200).json(posts);
});
app.delete("/posts/:postId", async (req, res) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId); // find and delete instead of just find
    res.status(200).json(deletedPost); // set status to 200 and send back the deleted post
  });

app.get("/posts/:postId", async (req, res) => {
    const post = await Post.findById(req.params.postId); // get a specific post, by sending the URL segment as an id to match (only works if the bit after posts/ is actually a valid id, theoretically it could be any string)
    res.status(200).json(post); // set status to 200 and send back JSONified post data
  });

//postcreate
app.post('/posts', authUser, async (req, res) => {

    const post = new Post({
        description: req.body.description,
        species: req.body.species,
        location: req.body.location,
        author: req.userId,
    });
    const savedPost = await post.save();
    res.status(200).send(savedPost);
});


//editpost
app.patch('/posts/:postId', async (req, res, next) => {
    try {
        const data = {
            description: req.body.description,
            species: req.body.species,
            location: req.body.location,
        };
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            data
        );
        res.json(updatedPost);
         } catch (error) {
           next(error);
    }
});

//users
const User = require("./models/User");

app.post('/users/register', async (req, res) => {
    const existUser = await User.findOne({ username: req.body.username });
    console.log(req.body.username);
    if (existUser) {
        return res.status(409).json({ message: "this username exists" });
    } else {
        bcrypt.hash(req.body.password, 10, async (error, hash) => {
            if (error) {
                return res.status(500).json({ error: error })
            } else {
                const user = new User({
                    username: req.body.username,
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
    const existUser = await User.findOne({ username: req.body.username });
    if (!existUser) {
        return res.status(401).json({ message: "Your details are incorrect" })
    } else {
        bcrypt.compare(req.body.password, existUser.password, (error, result) => {
            if (error) {
                return res.status(500)({ message: "Your details are incorrect" })
            } else {
                if (result) {
                    const expirationTime = 1 * 60 * 60;
                    const token = jwt.sign({ id: existUser._id, username: existUser.username }, "secretKey", { expiresIn: expirationTime });

                    res.cookie("jwt", token, { maxAge: expirationTime * 1000, httpOnly: true });
                    res.status(200).json({ username: existUser.username })
                } else {
                    res.status(401).json({ message: "Your details are incorrect" });

                }
            }
        });
    }
});

// logout
app.get("/users/logout", async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.json({ message: "logged out" });
})

app.get("/posts/:postId/comments", async (req, res) => {
  const post = await Post.findById(req.params.postId); // get the matching post (this part is exactly the same as above, getting a specific post)
  res.status(200).json(post.comments); // the difference is here we send back just the comments, not the whole post
});

// this endpoint listens for GET requests to http://localhost:3000/posts/<segment-labelled-as-postID>/comments/<segment-labelled-as-commentId>/ and if detected, sends back a specific comment from a specific post
app.get("/posts/:postId/comments/:commentId", async (req, res) => {
  const post = await Post.findById(req.params.postId); // get the post the matches the postId
  const comment = post.comments.id(req.params.commentId); // get the comment from that post that matches the commentId
  res.status(200).json(comment); // send it back to the client
});

// this endpoint listens for DELETE requests to to http://localhost:3000/posts/<segment-labelled-as-postID>/comments/<segment-labelled-as-commentId>/ and if detected, deletes a specific comment from a specific post and sends it back to the client
app.delete("/posts/:postId/comments/:commentId", async (req, res) => {
  const post = await Post.findById(req.params.postId); // find the post
  post.comments.pull(req.params.commentId); // pull the matching comment from the posts comment array
  const savedPost = await post.save(); // save the post back to the database
  res.status(200).send(savedPost); // send back the newly saved post to the client
});

// this endpoint listens for POST requests to to http://localhost:3000/posts/<segment-labelled-as-postID>/comments/ and if detected, creates a new post comment and pushes that to an existing post, saves the post to the database and sends it back to the client
app.post("/posts/:postId/comments", async (req, res) => {
  const post = await Post.findById(req.params.postId);  // find the matchin post
  post.comments.push({ // create an object that matches the comment schema containing the comment data from the request, and add it to the fetched posts' comments array. This array is defined in the schema so it expects a comment that matches the schema and will reject anything that doesn't fit
    author: req.body.author, // include the author (if present, see the front end comments regarding this)
    text: req.body.text, // include the text
  });
  const savedPost = await post.save(); // save the updated post
  res.status(200).send(savedPost); // and then send it to the client
});






