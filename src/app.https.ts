import fs from "fs";
import http2 from "http2";
import path from "path";

const server = http2.createSecureServer({
  key: fs.readFileSync(path.join(__dirname, '../keys/server.key')),
  cert: fs.readFileSync(path.join(__dirname, '../keys/server.crt')),
}, (req, resp) => {

  // Si req.url es undefined, usamos "/"
  const url = req.url || "/";

  let filePath = "";
  if (req.url === "/") {
    filePath = path.join(__dirname, "../public/index.html");
  } else {
    filePath = path.join(__dirname, "../public", url);
  }

  const ext = path.extname(filePath);
  let contentType = "text/html";
  if (ext === ".css") contentType = "text/css";
  if (ext === ".js") contentType = "application/javascript";

  try {
    const content = fs.readFileSync(filePath);
    resp.writeHead(200, { "Content-Type": contentType });
    resp.end(content);
  } catch (err) {
    resp.writeHead(404, { "Content-Type": "text/html" });
    resp.end("<h1>404 Not Found</h1>");
  }
  
});

server.listen(8080, () => {
  console.log("Server running port 8080");
});
