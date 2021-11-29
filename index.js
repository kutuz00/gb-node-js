const server = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const currentDirectory = process.cwd();

const app = server.createServer((req, res) => {
  const requestFile = path.join(currentDirectory, req.url);
  const urlReq = url.pathToFileURL(requestFile);

  fs.access(urlReq, fs.constants.R_OK, (err) => {
    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/html; charset=utf-8",
      });

      res.write("File not exists!!!");
    } else {
      if (fs.lstatSync(urlReq.pathname).isDirectory()) {
        const data = fs.readdirSync(urlReq.pathname);
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
        });
        data.map((filePath) => {
          res.write(
            `<p><a href=${path.join(req.url, filePath)}>${filePath}</a></p>`
          );
        });
      } else if (fs.lstatSync(requestFile).isFile()) {
        const file = fs.readFileSync(requestFile);
        res.writeHead(200, {
          "Content-Type": "text/javascript; charset=utf-8",
        });

        res.write(file);
      }
    }
    res.end();
  });
});

app.listen(5555, (error) => {
  if (error) console.log("Something went wrong: ", error);
  else console.log("Server started on port 5555");
});
