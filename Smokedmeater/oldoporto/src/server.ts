import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Load the protobuf
const PROTO_PATH = path.resolve(__dirname, '../../protos/oldoporto.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const oldoportoProto = grpc.loadPackageDefinition(packageDefinition).oldoporto as any;

// Implement the boilPotatoes function
function keepWarm(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): void {
    const temperature = call.request.temperature;
    callback(null, { result: `things have been kept at ${temperature}°C` });
}

// Create the gRPC server
const server = new grpc.Server();
server.addService(oldoportoProto.OldoportoService.service, {keepWarm});

// Start the server
const PORT = '127.0.0.1:50055';
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  console.log(`Oldoporto server running at http://${PORT}`);
});
