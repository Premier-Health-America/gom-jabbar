import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import OldoportoCommunicationService from '../src/services/oldoporto-communication.service';

jest.mock('@grpc/grpc-js');
jest.mock('@grpc/proto-loader');

describe('OldoportoCommunicationService', () => {
    let mockClient: any;
    let service: OldoportoCommunicationService;

    beforeEach(() => {
        mockClient = {
            keepWarm: jest.fn(),
        };

        // Mock the gRPC and protoLoader modules
        const mockGrpcLoadPackageDefinition = jest.fn().mockReturnValue({
            oldoporto: {
                OldoportoService: jest.fn(() => mockClient),
            },
        });

        (protoLoader.loadSync as jest.Mock).mockReturnValue({});
        (grpc.loadPackageDefinition as jest.Mock).mockImplementation(mockGrpcLoadPackageDefinition);

        // Create a new instance of the service for each test
        service = new OldoportoCommunicationService('localhost:50055');

        // Mock the getInstance method to return the fresh instance
        jest.spyOn(OldoportoCommunicationService, 'getInstance').mockReturnValue(service);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call keepWarm on the client with the correct parameters', async () => {
        const mockResponse = { result: 'Potatoes kept warm' };

        mockClient.keepWarm.mockImplementation((data: any, callback: any) => {
            callback(null, mockResponse); // Simulate success
        });

        const response = await service.keepWarm(75);

        // Check that keepWarm was called with the correct parameters
        expect(mockClient.keepWarm).toHaveBeenCalledWith(
            { temperature: 75 },
            expect.any(Function), // Ensure it was called
        );
        expect(response).toEqual(mockResponse);
    });

    it('should handle gRPC errors correctly', async () => {
        const mockError = new Error('gRPC Error');

        mockClient.keepWarm.mockImplementation((data: any, callback: any) => {
            callback(mockError, null); // Simulate error by calling the callback with an error
        });

        // Expect the promise to reject with the gRPC error
        await expect(service.keepWarm(75)).rejects.toThrow('gRPC Error');
    });
});
