let socket = io();
// Creer les variables capturant touts les elements HTML necessaires
const btnSend = document.getElementById("btnSend");
const message = document.getElementById("message");
const name = document.getElementById("name");
const messages = document.getElementById("messages");

//Evenement du document
document.addEventListener("DOMContentLoaded", function () {
  console.log("APP LOADED !!!");
  // Creer les evenements de SUBMISSIONS DES VALEURS DES INPUTS
  //SUbmit event
  btnSend.addEventListener("click", () => {
    const userSubmit = {
      name: name.value,
      message: message.value
    };
    //update messages on click
    postMessage(userSubmit);
  });
  getMessages();
});
//Socket io event for update messages instantly
socket.on("newMessage", updateMessages);
//Creer Les evenements de mise a jour de l'interface UI
function updateMessages(userSubmit) {
  //Creating posts element
  const h4 = document.createElement("h4");
  const p = document.createElement("p");
  const postTime = document.createElement("span");
  const userUI = document.createElement("div");
  //post time
  postTime.id = "postTime";
  let currentTime = new Date();
  postTime.innerHTML = currentTime.toUTCString();
  //name and message
  h4.innerHTML = userSubmit.name + " :";
  p.innerHTML = userSubmit.message;
  userUI.className = "userUI";
  //update UI
  userUI.append(h4, p, postTime);
  messages.append(userUI);
}

//get messages
function getMessages() {
  const url = "http://localhost:4100/api/messages";
  fetch(url)
    .then((reponse) => {
      return reponse.json();
    })
    .then((data) => {
      data.forEach((message) => {
        updateMessages(message);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}
//add message
function postMessage(message) {
  const url = "http://localhost:4100/api/messages";
  fetch(url, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
    method: "POST"
  })
    .then((reponse) => {
      return reponse.json();
    })
    .then((data) => {
      // data.forEach((message) => {
      updateMessages;
      // });
    })
    .catch((error) => {
      console.log(error.message);
    });
}

//permettre la modification des message envoyer

//permettre la suprression de message envoyer
