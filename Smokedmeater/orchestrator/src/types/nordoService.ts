import * as grpc from '@grpc/grpc-js';

export interface NordoService extends grpc.Client {
  boilPotatoes(
    request: {boilTime: number},
    callback: (error: grpc.ServiceError | null, response: { result: string }) => void
  ): void;
}
