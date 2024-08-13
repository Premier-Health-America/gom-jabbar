import * as grpc from '@grpc/grpc-js';

export interface BizarService extends grpc.Client {
  fryPotatoes(
    request: {oilType: string},
    callback: (error: grpc.ServiceError | null, response: { result: string }) => void
  ): void;
}
