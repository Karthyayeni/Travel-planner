const express = require("express");
const collection = require("./mongo"); // Your MongoDB collection
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const saltRounds = 10; // Number of rounds for bcrypt hashing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route for login
app.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        const user = await collection.findOne({ email: email });

        if (!user) {
            return res.json("notexist"); // User doesn't exist
        }

        // Compare entered password with hashed password in database
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            res.json("exist"); // Successful login
        } else {
            res.json("wrongpassword"); // Incorrect password
        }
    } catch (e) {
        res.status(500).json({ error: "Server error" });
    }
});



// Route for signup
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email: email });

        if (user) {
            return res.json("exist"); // User already exists
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const data = {
            email: email,
            password: hashedPassword,
        };

        await collection.insertMany([data]);
        res.json("notexist"); // Signup successful
    } catch (e) {
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});
