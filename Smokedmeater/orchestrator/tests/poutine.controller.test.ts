import { Router } from 'express';
import { PoutineController } from '../src/controllers/poutine.controller';
import { PoutineCreationService } from '../src/services/poutine-creation.service';
import { PoutineDeliveryService } from '../src/services/poutine-delivery.service';
import request from 'supertest';
import express, { Application } from 'express';

describe('PoutineController', () => {
  let app: Application;
  let poutineCreationService: jest.Mocked<PoutineCreationService>;
  let poutineDeliveryService: jest.Mocked<PoutineDeliveryService>;

  beforeEach(() => {
    poutineCreationService = {
        createPoutine: jest.fn(),
    } as unknown  as jest.Mocked<PoutineCreationService>;

    poutineDeliveryService = {
      sendPoutine: jest.fn(),
    } as unknown as jest.Mocked<PoutineDeliveryService>;

    const poutineController = new PoutineController(poutineCreationService, poutineDeliveryService);
    app = express();
    app.use('/', poutineController.router);
  });

  it('should call createPoutine with correct parameters', async () => {
    const mockResponse = "Create Poutine"
    poutineCreationService.createPoutine.mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/cook-poutine/5/10/canola/180')
      .send();
    expect(response.status).toBe(200);
    expect(response.text).toEqual(mockResponse);
    expect(poutineCreationService.createPoutine).toHaveBeenCalledWith(5, 10, 'canola', 180);
  });

  it('should call sendPoutine with correct parameters', async () => {
    const mockResponse: string = "Send Poutine";
    poutineDeliveryService.sendPoutine.mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/send-poutine/true')
      .send();

    expect(response.status).toBe(200);
    expect(response.text).toEqual(mockResponse);
    expect(poutineDeliveryService.sendPoutine).toHaveBeenCalledWith(true);
  });
});
