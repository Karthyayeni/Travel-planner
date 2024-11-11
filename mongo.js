const mongoose = require("mongoose");

// Replace with your MongoDB Atlas connection string
mongoose.connect("mongodb+srv://karthyayenip22cse:kavya1234@cluster0.60x5m.mongodb.net/travel-user?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.error("Connection failed", err);
});

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model("travelcollection", newSchema);

module.exports = collection;
