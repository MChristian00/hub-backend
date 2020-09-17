const EventEmitter = require("events");
const fs = require("fs");
const http = require("http");

const emitter = new EventEmitter();

const server = http.createServer((req, res) => {
  const readStream = fs.createReadStream(__dirname + "/index.html");
  res.writeHead(200, {
    "Content-Type": `text/html`,
  });
  readStream.pipe(res);
  // res.write("Hello from my nodejs app");
  // res.end();
});
console.log(process.env.PORT)
server.listen(3000);
console.log("Server started on port 3000 :)");

// emitter.addListener("log", () => {
//   console.log("event emitted");
// });

// global.setTimeout(() => {
//   fs.unlink("readme.txt", () => console.log("File deleted"));
// }, 100);

// const readStream = fs.createReadStream('readme.txt')
// const writeStram = fs.createWriteStream('readme3.txt')

// readStream.pipe(writeStram)

// const myEvent = new events.EventEmitter();

// const func = (msg) => {
//   console.log(msg);
// };

// myEvent.on("Greetings", function (msg) {
//   console.log(msg);
// });

// myEvent.emit("Greetings", "Hello");
