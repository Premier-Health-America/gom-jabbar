// src/index.ts
import { Application } from './app';
import { PoutineController } from './controllers/poutine.controller';

const poutineController = new PoutineController();

const appInstance = new Application(poutineController);

// Start the server on port 3000
const port = 3000;
appInstance.start(port);
