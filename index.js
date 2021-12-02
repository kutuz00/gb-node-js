const socket = require("socket.io");
const http = require("http");
const path = require("path");
const fs = require("fs");
const randomName = require("node-random-name");

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, "./index.html");
  const readStream = fs.createReadStream(indexPath);

  readStream.pipe(res);
});

const io = socket(server);

io.on("connection", (client) => {
  const clients = [];
  clients.push({
    id: client.id,
    clientName: randomName(),
  });
  const lastConnected = clients[clients.length - 1].clientName;
  console.log(`clien ${lastConnected} connected`);
  client.on("client-msg", (data) => {
    const payload = {
      message: data.message.split("").reverse().join(""),
    };

    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payload);
  });
  client.broadcast.emit("newClient", lastConnected);
  client.on("disconnecting", (reason) => {
    const payload = clients.map((client) => client.clientName);
    client.broadcast.emit("user-left", payload);
  });
});

server.listen(5555);
