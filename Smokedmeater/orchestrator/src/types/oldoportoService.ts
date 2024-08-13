import * as grpc from '@grpc/grpc-js';

export interface OldoportoService extends grpc.Client {
  keepWarm(
    request: {temperature: number},
    callback: (error: grpc.ServiceError | null, response: { result: string }) => void
  ): void;
}
