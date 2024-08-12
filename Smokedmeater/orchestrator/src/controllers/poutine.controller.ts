import express from 'express';
import { Router } from 'express';
import OutremonaCommunicationService from '../services/outremona-communication.service';

const app = express();

export class PoutineController {
    router!: Router;

    constructor() {
        this.configureRouter();
    }

    private configureRouter(): void {
        this.router = Router();
        const outremonaService = OutremonaCommunicationService.getInstance();

        this.router.get('/', (req,res) => {
            res.send('Hello  !');
            outremonaService.squeezeCheese()
            .then(response => console.log(response))
            .catch(err => console.error(err));
        });
    }
}


