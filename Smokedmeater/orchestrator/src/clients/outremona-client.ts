import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { OutremonaService } from '../types/outremonaService'; // Import the interface

const PROTO_PATH = path.resolve(__dirname, '../../protos/outremona.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const outremonaProto = grpc.loadPackageDefinition(packageDefinition).outremona as any;

const outremonaClient = new outremonaProto.YourService('localhost:50051', grpc.credentials.createInsecure()) as OutremonaService;

export default outremonaClient;
