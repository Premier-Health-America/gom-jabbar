// src/application.ts
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { PoutineController } from './controllers/poutine.controller';
import * as http from 'http';

export class Application {
    app: express.Application;

    constructor(private readonly poutineController: PoutineController) {
        this.app = express();
        this.config();
        this.bindRoutes();
    }

    private config(): void {
        // Load OpenAPI specification
        const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));
        // Serve OpenAPI docs
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    private bindRoutes(): void {
        this.app.use('/', this.poutineController.router);
    }

    public start(port: number): void {
        const server = http.createServer(this.app);
        server.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    }
}
