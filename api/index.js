const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const {Router} = require("express");
const userRoute = require("./routes/users")
const movieRoute = require("./routes/movies")
const listRoute = require("./routes/lists")

dotenv.config();

main()
    .then(()=> console.log("DB Connection Successfull!"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL );
}

app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(8800, () =>{
    console.log(("Backend sever is running!"));
});