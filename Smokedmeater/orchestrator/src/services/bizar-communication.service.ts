import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { BizarService } from '../types/bizarService';

class BizarCommunicationService {
  private static instance: BizarCommunicationService;
  private client: BizarService;

  constructor(address: string) {
    const PROTO_PATH = path.resolve(__dirname, '../../../protos/bizar.proto');

    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    });

    const bizarProto = grpc.loadPackageDefinition(packageDefinition).bizar as any;
    this.client = new bizarProto.BizarService(address, grpc.credentials.createInsecure()) as BizarService;
  }

  public static getInstance(): BizarCommunicationService {
    if (!BizarCommunicationService.instance) {
        BizarCommunicationService.instance = new BizarCommunicationService("localhost:50054");
    }
    return BizarCommunicationService.instance;
  }

  fryPotatoes(oilType: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.fryPotatoes({oilType}, (error: grpc.ServiceError | null, response: { result: string }) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      });
    });
  }
}

export default BizarCommunicationService;
