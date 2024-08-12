import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Load the protobuf
const PROTO_PATH = path.resolve(__dirname, '../../protos/outremona.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const outremonaProto = grpc.loadPackageDefinition(packageDefinition).outremona as any;

// Implement the squeezeCheese function
function squeezeCheese(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): void {
  callback(null, { result: "I'm not a Montreal's bagel who are the best in the world, don't even talk to me about New York bagels, amateur!" });
}

// Create the gRPC server
const server = new grpc.Server();
server.addService(outremonaProto.OutremonaService.service, { squeezeCheese });

// Start the server
const PORT = '127.0.0.1:50051';
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  console.log(`Outremona server running at http://${PORT}`);
});
