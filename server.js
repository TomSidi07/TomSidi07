//Creer le server express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
//configuration de l'application
//*express
app.use(express.static(__dirname));
app.use(express.json());
//*bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//port set
const port = process.env.PORT || 4100;
//mongoose promise set
mongoose.Promise = global.Promise;

//model de donnees
const Message = mongoose.model("Message", {
  name: String,
  message: String
});
//Configurations des routes

//donnees de test
// const messages = [
//   {
//     name: "test1",
//     message: "Happy Happy!"
//   },
//   {
//     name: "test2",
//     message: "Happy Test !"
//   },
//   {
//     name: "test3",
//     message: "Holla what happiness !"
//   }
// ];
//*get
app.get("/api/messages", (req, res) => {
  Message.find().then((messages) => {
    res.send(messages);
  });
});
//*post
app.post("/api/messages", (req, res) => {
  const newMessage = req.body;
  const message = new Message(newMessage);
  message
    .save()
    .then((message) => {
      io.emit("newMessage", newMessage);
      res.status(201).send(message);
    })
    .catch((error) => {
      console.log(error);
    });
});
//*put
//delete
//socket io
io.on("connection", () => {
  console.log("user connected");
});
//mongodb config

mongoose.connect("mongodb://localhost:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//ecoute du server express sur le port 4100
http.listen(port, () => {
  console.log("App runnning on ", port);
});
