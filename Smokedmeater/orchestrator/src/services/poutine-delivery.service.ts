import PierreCommunicationService from './pierre-communication.service';

export class PoutineDeliveryService {
  private pierreService: PierreCommunicationService;

  constructor() {
    this.pierreService = PierreCommunicationService.getInstance();
  }

  public async sendPoutine(drunkIsDetected: boolean): Promise<string> {
    let result: string = "";
    try {
        result = await this.pierreService.sendPoutine(drunkIsDetected)
        console.log("Send poutine response", result)
    } catch (error) {
      console.error('Error sending poutine:', error);
    }
    return result;
  }
}
