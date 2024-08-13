// src/index.ts
import { Application } from './app';
import { PoutineController } from './controllers/poutine.controller';
import { PoutineCreationService } from './services/poutine-creation.service';
import { PoutineDeliveryService } from './services/poutine-delivery.service';

// Create instances of the services
const poutineCreationService = new PoutineCreationService();
const poutineDeliveryService = new PoutineDeliveryService();
const poutineController = new PoutineController(poutineCreationService, poutineDeliveryService);

const appInstance = new Application(poutineController);

// Start the server on port 3000
const port = 3000;
appInstance.start(port);
