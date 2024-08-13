import * as grpc from '@grpc/grpc-js';

export interface VerdunyService extends grpc.Client {
  cutAndDip(
    request: {cubeSize: number },
    callback: (error: grpc.ServiceError | null, response: { result: string }) => void
  ): void;
}
