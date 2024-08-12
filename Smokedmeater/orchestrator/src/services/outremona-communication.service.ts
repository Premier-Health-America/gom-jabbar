import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { OutremonaService } from '../types/outremonaService';


class OutremonaCommunicationService {
  private static instance: OutremonaCommunicationService;
  private client: OutremonaService;

  constructor(address: string) {
    const PROTO_PATH = path.resolve(__dirname, '../../../protos/outremona.proto');

    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    });

    const outremonaProto = grpc.loadPackageDefinition(packageDefinition).outremona as any;
    this.client = new outremonaProto.OutremonaService(address, grpc.credentials.createInsecure()) as OutremonaService;
  }

  public static getInstance(): OutremonaCommunicationService {
    if (!OutremonaCommunicationService.instance) {
      OutremonaCommunicationService.instance = new OutremonaCommunicationService("localhost:50051");
    }
    return OutremonaCommunicationService.instance;
  }

  squeezeCheese(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.squeezeCheese({}, (error: grpc.ServiceError | null, response: { result: string }) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      });
    });
  }
}

export default OutremonaCommunicationService;
