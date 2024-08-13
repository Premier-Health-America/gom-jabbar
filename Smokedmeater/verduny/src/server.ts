import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Load the protobuf
const PROTO_PATH = path.resolve(__dirname, '../../protos/verduny.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const verdunyProto = grpc.loadPackageDefinition(packageDefinition).verduny as any;
// const outremonaProto = grpc.loadPackageDefinition(packageDefinition).outremona as any;

// Create the gRPC server
const server = new grpc.Server();
function cutAndDip(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): void {
    const cubeSize = call.request.cubeSize;
    
    callback(null, { result: `cube of size ${cubeSize} dipped for 25 seconds` });
  }

// Create the gRPC server
server.addService(verdunyProto.VerdunyService.service, { cutAndDip });

// Start the server
const PORT = '127.0.0.1:50052';
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  console.log(`Verduny server running at http://${PORT}`);
});
