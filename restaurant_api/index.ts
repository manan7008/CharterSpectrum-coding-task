import { ServerService } from './services/server.service';
import controllers from './controllers/index';

const server = new ServerService(controllers, 3001, '/api/v1');
server.listen();
server.setupDb();