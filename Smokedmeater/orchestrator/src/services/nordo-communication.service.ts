import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { OutremonaService } from '../types/outremonaService';
import { NordoService } from '../types/nordoService';


class NordoCommunicationService {
  private static instance: NordoCommunicationService;
  private client: NordoService;

  constructor(address: string) {
    const PROTO_PATH = path.resolve(__dirname, '../../../protos/nordo.proto');

    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    });

    const nordoProto = grpc.loadPackageDefinition(packageDefinition).nordo as any;
    this.client = new nordoProto.NordoService(address, grpc.credentials.createInsecure()) as NordoService;
  }

  public static getInstance(): NordoCommunicationService {
    if (!NordoCommunicationService.instance) {
        NordoCommunicationService.instance = new NordoCommunicationService("localhost:50053");
    }
    return NordoCommunicationService.instance;
  }

  boilPotatoes(boilTime: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.boilPotatoes({boilTime}, (error: grpc.ServiceError | null, response: { result: string }) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      });
    });
  }
}

export default NordoCommunicationService;
