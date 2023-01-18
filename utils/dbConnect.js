const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

async function dbConnect() {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
    (err) => {
      if (!err) {
        console.log("MongoDB Connection Succeeded.");
      } else {
        console.log("Error in DB connection: " + err);
      }
    }
  );
}
export default dbConnect;
