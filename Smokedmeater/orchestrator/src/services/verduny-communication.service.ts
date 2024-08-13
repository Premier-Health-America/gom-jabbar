import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { VerdunyService } from '../types/verdunyService';


class VerdunyCommunicationService {
  private static instance: VerdunyCommunicationService;
  private client: VerdunyService;

  constructor(address: string) {
    const PROTO_PATH = path.resolve(__dirname, '../../../protos/verduny.proto');

    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    });

    const verdunyProto = grpc.loadPackageDefinition(packageDefinition).verduny as any;
    this.client = new verdunyProto.VerdunyService(address, grpc.credentials.createInsecure()) as VerdunyService;
  }

  public static getInstance(): VerdunyCommunicationService {
    if (!VerdunyCommunicationService.instance) {
        VerdunyCommunicationService.instance = new VerdunyCommunicationService("localhost:50052");
    }
    return VerdunyCommunicationService.instance;
  }

  cutAndDip(cubeSize: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.cutAndDip({cubeSize}, (error: grpc.ServiceError | null, response: { result: string }) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      });
    });
  }
}

export default VerdunyCommunicationService;
