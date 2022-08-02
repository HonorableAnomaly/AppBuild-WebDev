const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/relationshipDB"),
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected...");
});

const userSchema = new Schema({
  username: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

// const makeTweets = async () => {
//   //  Initial user creation on first pass through
//   //  const user = new User({username: "codcamper333", age: 35});
//   const user = await User.findOne({ username: "codcamper333" });
//   //   Initial tweet on first pass through
//   //   const tweet1 = new Tweet({ text: "I camped a noob today, like every day.", likes: 0 });
//   const tweet2 = new Tweet({ text: "I love camping noobs soooo much!", likes: 346077 });
//   tweet2.user = user;
//   //   Initial user save on first pass through
//   //   user.save();
//   tweet2.save();
// };

// makeTweets();

const findTweet = async () => {
  // Populate the key in this scenario, not the Schema, and specify that you only want the username
  const t = await Tweet.find().populate("user", "username");
  console.log(t);
};

findTweet();
