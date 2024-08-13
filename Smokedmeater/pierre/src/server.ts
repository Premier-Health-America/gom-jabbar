import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Load the protobuf
const PROTO_PATH = path.resolve(__dirname, '../../protos/pierre.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const pierreProto = grpc.loadPackageDefinition(packageDefinition).pierre as any;

// Implement the boilPotatoes function
function mixPoutine(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): void {
    const potatoSize = call.request.potatoSize;
    const potatoSoftnessLevel = call.request.potatoSoftnessLevel;
    const oilType = call.request.oilType;
    const specificTemperature = call.request.specificTemperature;

    callback(null, {result: `Poutine with potatoes of size ${potatoSize} inch per inch, softness level of ${potatoSoftnessLevel}, fried in ${oilType} oil with a secret gravy sauce kept at ${specificTemperature}°C has been prepared`});
}

function sendPoutine(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>): void {
    const drunkIsDetected = call.request.drunkIsDetected;
    const result: string = drunkIsDetected ? "Hungry client detected, poutine approved to be sent": "No hungry client detected, poutine not approved to be sent"
    callback(null, { result: result });
}

// Create the gRPC server
const server = new grpc.Server();
server.addService(pierreProto.PierreService.service, {mixPoutine, sendPoutine});

// Start the server
const PORT = '127.0.0.1:50056';
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  console.log(`Pierre server running at http://${PORT}`);
});
