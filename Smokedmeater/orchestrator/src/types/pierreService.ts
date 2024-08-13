import * as grpc from '@grpc/grpc-js';

export interface PierreService extends grpc.Client {
  mixPoutine(
    request: {potatoSize: number, potatoSoftnessLevel: number, oilType: string, specificTemperature: number},
    callback: (error: grpc.ServiceError | null, response: { result: string }) => void
  ): void;
  sendPoutine(
    request: {drunkIsDetected: boolean},
    callback: (error: grpc.ServiceError | null, response: { result: string }) => void
  ): void;
}
