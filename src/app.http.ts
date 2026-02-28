import fs from "fs";
import http from "http";
import path from "path";

const server = http.createServer((req, resp) => {
  // console.log(req.url);

  // resp.write('Hola mundo');
  // resp.end();

  // resp.writeHead(200, {'content-type': 'text/html'});
  // resp.write('<h1>Hola mundo</h1>');
  // resp.write(`URL ${req.url}`)

  //   const data = {
  //     name: "Cristian",
  //     age: 30,
  //     city: "New York",
  //   };

  //   resp.writeHead(200, {'content-type': 'application/json'});
  //   resp.end(JSON.stringify(data));

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



  // if (req.url?.endsWith(".js")) {
  //   resp.writeHead(200, { "Content-Type": "application/javascript" });
  // } else if (req.url?.endsWith(".css")) {
  //   resp.writeHead(200, { "Content-Type": "tex/css" });
  // }

  // const filePath2 = path.join(__dirname, `../public${req.url}`);
  // const htmlFile2 = fs.readFileSync(filePath2, "utf-8");
  // resp.end(htmlFile2);
  
});

server.listen(8080, () => {
  console.log("Server running port 8080");
});
