import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Load the protobuf
const PROTO_PATH = path.resolve(__dirname, '../../protos/nordo.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const nordoProto = grpc.loadPackageDefinition(packageDefinition).nordo as any;

// Implement the boilPotatoes function
function boilPotatoes(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): void {
    const boilTime = call.request.boilTime;
    callback(null, { result: `potatoes have been boiled for ${boilTime} seconds` });
}

// Create the gRPC server
const server = new grpc.Server();
server.addService(nordoProto.NordoService.service, {boilPotatoes});

// Start the server
const PORT = '127.0.0.1:50053';
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  console.log(`Nordo server running at http://${PORT}`);
});
