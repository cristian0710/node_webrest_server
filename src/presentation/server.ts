import express, { Router } from "express";
import path from "node:path";

interface Options {
  port: number;
  public_path?: string;
  routes: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly public_path: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const {port, public_path = 'public', routes} = options;
    this.port = port;
    this.public_path = public_path;
    this.routes = routes;
  }

  async start() {

    // Middlewares
    this.app.use(express.json()); //cualquier peticion que venga con el body de tipo POST para que no sea undefined y se transforme en un objeto JSON -> raw
    this.app.use(express.urlencoded({extended: true})); // para peticiones x-www-form-ulencoded

    // Public Folder}
    this.app.use(express.static(path.join(__dirname, `../../${this.public_path}`)));

    // Ruta principal
    this.app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, `../../${this.public_path}/index.html`));
    });

    // Routes
    this.app.use(this.routes);

    // Catch-all: acepta cualquier ruta
    this.app.get(/.*/, (req, res) => {
      res.sendFile(path.join(__dirname, `../../${this.public_path}/index.html`));
    });

    
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}
