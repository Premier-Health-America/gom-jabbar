import express from 'express';
import { Router } from 'express';

const app = express();

export class PoutineController {
    router!: Router;

    constructor() {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();

        this.router.get('/', (req,res) => {
            res.send('Hello  !');
        });
    }
}


