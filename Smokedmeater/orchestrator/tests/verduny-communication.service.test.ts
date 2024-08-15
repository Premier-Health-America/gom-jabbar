import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import VerdunyCommunicationService from '../src/services/verduny-communication.service';

jest.mock('@grpc/grpc-js');
jest.mock('@grpc/proto-loader');

describe('VerdunyCommunicationService', () => {
    let mockClient: any;
    let service: VerdunyCommunicationService;

    beforeEach(() => {
        mockClient = {
            cutAndDip: jest.fn(),
        };

        // Mock the gRPC and protoLoader modules
        const mockGrpcLoadPackageDefinition = jest.fn().mockReturnValue({
            verduny: {
                VerdunyService: jest.fn(() => mockClient),
            },
        });

        (protoLoader.loadSync as jest.Mock).mockReturnValue({});
        (grpc.loadPackageDefinition as jest.Mock).mockImplementation(mockGrpcLoadPackageDefinition);

        // Create a new instance of the service for each test
        service = new VerdunyCommunicationService('localhost:50052');

        // Mock the getInstance method to return the fresh instance
        jest.spyOn(VerdunyCommunicationService, 'getInstance').mockReturnValue(service);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call cutAndDip on the client with the correct parameters and return the result', async () => {
        const mockResponse = { result: 'Cut and dip successful' };

        // Mock the cutAndDip method
        mockClient.cutAndDip.mockImplementation((data: any, callback: any) => {
            callback(null, mockResponse); // Simulate success
        });

        const response = await service.cutAndDip(10);

        // Check that cutAndDip was called with the correct parameters
        expect(mockClient.cutAndDip).toHaveBeenCalledWith(
            { cubeSize: 10 },
            expect.any(Function), // Ensure it was called with a function
        );
        expect(response).toEqual(mockResponse);
    });

    it('should handle gRPC errors correctly', async () => {
        const mockError = new Error('gRPC Error');

        // Mock the cutAndDip method to simulate an error
        mockClient.cutAndDip.mockImplementation((data: any, callback: any) => {
            callback(mockError, null); // Simulate error
        });

        // Expect the promise to reject with the gRPC error
        await expect(service.cutAndDip(10)).rejects.toThrow('gRPC Error');
    });
});
