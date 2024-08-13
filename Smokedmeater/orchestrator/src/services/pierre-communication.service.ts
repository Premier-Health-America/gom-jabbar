import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { PierreService } from '../types/pierreService';


class PierreCommunicationService {
  private static instance: PierreCommunicationService;
  private client: PierreService;

  constructor(address: string) {
    const PROTO_PATH = path.resolve(__dirname, '../../../protos/pierre.proto');

    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    });

    const pierreProto = grpc.loadPackageDefinition(packageDefinition).pierre as any;
    this.client = new pierreProto.PierreService(address, grpc.credentials.createInsecure()) as PierreService;
  }

  public static getInstance(): PierreCommunicationService {
    if (!PierreCommunicationService.instance) {
        PierreCommunicationService.instance = new PierreCommunicationService("localhost:50056");
    }
    return PierreCommunicationService.instance;
  }

  mixPoutine(potatoSize:number, potatoSoftnessLevel: number,  oilType:string, specificTemperature: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.mixPoutine({potatoSize, potatoSoftnessLevel, oilType, specificTemperature}, (error: grpc.ServiceError | null, response: { result: string }) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      });
    });
  }

  sendPoutine(drunkIsDetected:boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.sendPoutine({drunkIsDetected}, (error: grpc.ServiceError | null, response: { result: string }) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      });
    });
}
}

export default PierreCommunicationService;
