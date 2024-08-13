import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Load the protobuf
const PROTO_PATH = path.resolve(__dirname, '../../protos/bizar.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const bizarProto = grpc.loadPackageDefinition(packageDefinition).bizar as any;

// Implement the fryPotatoes function
function fryPotatoes(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): void {
    const oilType = call.request.oilType;
    callback(null, { result: `potatoes have been fried with ${oilType} oil` });
}

// Create the gRPC server
const server = new grpc.Server();
server.addService(bizarProto.BizarService.service, {fryPotatoes});

// Start the server
const PORT = '127.0.0.1:50054';
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  console.log(`Bizar server running at http://${PORT}`);
});
