import { Router } from 'express';
import { PoutineCreationService } from '../services/poutine-creation.service';
import { PoutineDeliveryService } from '../services/poutine-delivery.service';

export class PoutineController {
    router!: Router;
    private poutineCreationService: PoutineCreationService;
    private poutineDeliveryService: PoutineDeliveryService;
    
    constructor(poutineCreationService: PoutineCreationService, poutineDeliveryService: PoutineDeliveryService) {
        this.poutineCreationService = poutineCreationService 
        this.poutineDeliveryService = poutineDeliveryService 
        this.configureRouter();  
    }

    private configureRouter(): void {
        this.router = Router();

        this.router.get('/cook-poutine/:potatoSize/:boilTime/:oilType/:temperature', async (req,res) => {
            const potatoSize = parseInt(req.params.potatoSize);
            const boilTime = parseInt(req.params.boilTime);
            const oilType = req.params.oilType;
            const temperature = parseInt(req.params.temperature);
            const response = await this.poutineCreationService.createPoutine(potatoSize, boilTime, oilType, temperature);
            res.send(response)
        });

        this.router.get('/send-poutine/:drunkIsDetected', async (req,res) => {
            const drunkIsDetected = req.params.drunkIsDetected === 'true';
            const response = await this.poutineDeliveryService.sendPoutine(drunkIsDetected);
            res.send(response)
        });
    }
}


