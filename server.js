var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.text());
app.use(express.static("static"));

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let usersTab = []
let cards = ["blue1", "blue2", "blue3", "blue4","red1", "red2", "red3", "red4","green1", "green2", "green3", "green4","orange1", "orange2", "orange3", "orange4"];
let firstCard = ""
let secondCard = ""

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

app.get("/", function (req, res) {
  res.send("index.html");
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('moveWasMade', (tab) => {
    console.log('Move');
    io.emit('moveReturned', tab)
  });
});

app.post("/LOG_IN", function (req,res) {
  let obj = JSON.parse(req.body)
  let user = obj.user
  if(user == ""){
    res.send(JSON.stringify({error: "empty"}))
  }
  else if(usersTab.length > 1){
    res.send(JSON.stringify({error: "many"}))
  }
  else if(usersTab.includes(user)){
    res.send(JSON.stringify({error: "repeat"}))
  }
  else{
    usersTab.push(user)
    shuffle(cards)
    res.send(JSON.stringify({error: "none", card: cards[cards.length-1], user: user}))
    if(usersTab.length == 2){
      secondCard = cards[cards.length-1]
      io.emit('gameStarted', [firstCard, secondCard]);
    }
    else{
      firstCard = cards[cards.length-1]
    }
    cards.pop()
  }
})

app.post('/RESET', (req,res)=>{
  usersTab = []
  cards = ["blue1", "blue2", "blue3", "blue4","red1", "red2", "red3", "red4","green1", "green2", "green3", "green4","orange1", "orange2", "orange3", "orange4"];
  firstCard = ""
  secondCard = ""
  res.end()
})

server.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});
