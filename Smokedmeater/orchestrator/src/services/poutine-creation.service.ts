import BizarCommunicationService from './bizar-communication.service';
import NordoCommunicationService from './nordo-communication.service';
import OldoportoCommunicationService from './oldoporto-communication.service';
import OutremonaCommunicationService from './outremona-communication.service';
import PierreCommunicationService from './pierre-communication.service';
import VerdunyCommunicationService from './verduny-communication.service';

export class PoutineCreationService {
  private outremonaService: OutremonaCommunicationService;
  private verdunyService: VerdunyCommunicationService;
  private nordoService: NordoCommunicationService;
  private bizarService: BizarCommunicationService;
  private oldoportoService: OldoportoCommunicationService;
  private pierreService: PierreCommunicationService;

  constructor() {
    this.outremonaService = OutremonaCommunicationService.getInstance();
    this.verdunyService = VerdunyCommunicationService.getInstance();
    this.nordoService = NordoCommunicationService.getInstance();
    this.bizarService = BizarCommunicationService.getInstance();
    this.oldoportoService = OldoportoCommunicationService.getInstance();
    this.pierreService = PierreCommunicationService.getInstance();
  }

  public async createPoutine(potatoSize: number, boilTime: number, oilType: string, temperature: number): Promise<string> {
    let result: string = "";
    try {
      // Call Outremona Service
      const cheeseResponse = await this.outremonaService.squeezeCheese();
      console.log('Cheese Response:', cheeseResponse);

      // Call Verduny Service
      const cutAndDipResponse = await this.verdunyService.cutAndDip(potatoSize);
      console.log('Cut and Dip Response:', cutAndDipResponse);

      // Call Nordo Service
      const boilPotatoesResponse = await this.nordoService.boilPotatoes(boilTime);
      console.log('Boil Potatoes Response:', boilPotatoesResponse);

      // Call Bizar Service
      const fryPotatoesResponse = await this.bizarService.fryPotatoes(oilType);
      console.log('Fry Potatoes Response:', fryPotatoesResponse);
      
      const warmThingsResponse = await this.oldoportoService.keepWarm(temperature);
      console.log('Warm Things Response:', warmThingsResponse);

      // Call Pierre Service to mix the poutine
      const mixPoutineResponse = await this.pierreService.mixPoutine(potatoSize, 10, oilType, temperature);
      console.log('Mix poutine Response:', mixPoutineResponse);
      result = mixPoutineResponse;
    } catch (error) {
      console.error('Error creating poutine:', error);
    }

    return result;
  }




}
