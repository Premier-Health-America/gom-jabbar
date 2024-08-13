import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { OldoportoService } from '../types/oldoportoService';


class OldoportoCommunicationService {
  private static instance: OldoportoCommunicationService;
  private client: OldoportoService;

  constructor(address: string) {
    const PROTO_PATH = path.resolve(__dirname, '../../../protos/oldoporto.proto');

    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    });

    const oldoportoProto = grpc.loadPackageDefinition(packageDefinition).oldoporto as any;
    this.client = new oldoportoProto.OldoportoService(address, grpc.credentials.createInsecure()) as OldoportoService;
  }

  public static getInstance(): OldoportoCommunicationService {
    if (!OldoportoCommunicationService.instance) {
        OldoportoCommunicationService.instance = new OldoportoCommunicationService("localhost:50055");
    }
    return OldoportoCommunicationService.instance;
  }

  keepWarm(temperature: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.keepWarm({temperature}, (error: grpc.ServiceError | null, response: { result: string }) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      });
    });
  }
}

export default OldoportoCommunicationService;
