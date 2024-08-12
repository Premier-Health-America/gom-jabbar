import * as grpc from '@grpc/grpc-js';

export interface OutremonaService extends grpc.Client {
  squeezeCheese(
    request: {},
    callback: (error: grpc.ServiceError | null, response: { result: string }) => void
  ): void;
}
