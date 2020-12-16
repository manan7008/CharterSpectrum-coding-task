import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from "mongoose";
import * as cors from 'cors';


const app = express();
app.use(bodyParser.json());

export class ServerService {
    public app: express.Application;
    public port: number;
    public intialRoute: string;

    constructor(controllers, port, intialRoute) {
        this.app = express();
        this.port = port;
        this.intialRoute = intialRoute

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use(this.intialRoute, controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

    public setupDb(): void {
        var mongoDb = "mongodb://127.0.0.1/restaurant-db";
        mongoose.connect(mongoDb);
        var db = mongoose.connection;
        db.on("error", console.error.bind(console, "MongoDB Connection error"));
    }
}