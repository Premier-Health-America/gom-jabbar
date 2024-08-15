import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import OutremonaCommunicationService from '../src/services/outremona-communication.service';

jest.mock('@grpc/grpc-js');
jest.mock('@grpc/proto-loader');

describe('OutremonaCommunicationService', () => {
    let mockClient: any;
    let service: OutremonaCommunicationService;

    beforeEach(() => {
        mockClient = {
            squeezeCheese: jest.fn(),
        };

        // Mock the gRPC and protoLoader modules
        const mockGrpcLoadPackageDefinition = jest.fn().mockReturnValue({
            outremona: {
                OutremonaService: jest.fn(() => mockClient),
            },
        });

        (protoLoader.loadSync as jest.Mock).mockReturnValue({});
        (grpc.loadPackageDefinition as jest.Mock).mockImplementation(mockGrpcLoadPackageDefinition);

        // Create a new instance of the service for each test
        service = new OutremonaCommunicationService('localhost:50051');

        // Mock the getInstance method to return the fresh instance
        jest.spyOn(OutremonaCommunicationService, 'getInstance').mockReturnValue(service);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call squeezeCheese on the client and return the correct result', async () => {
        const mockResponse = { result: 'Cheese squeezed' };

        // Mock the squeezeCheese method to call the callback immediately
        mockClient.squeezeCheese.mockImplementation((data: any, callback: any) => {
            callback(null, mockResponse); // Simulate success by calling the callback with null error
        });

        const response = await service.squeezeCheese();

        // Check that squeezeCheese was called with the correct parameters
        expect(mockClient.squeezeCheese).toHaveBeenCalledWith(
            {},
            expect.any(Function), // Ensure it was called with a function
        );
        expect(response).toEqual(mockResponse);
    });

    it('should handle gRPC errors correctly', async () => {
        const mockError = new Error('gRPC Error');

        // Mock the squeezeCheese method
        mockClient.squeezeCheese.mockImplementation((data: any, callback: any) => {
            callback(mockError, null); // Simulate error
        });

        // Expect the promise to reject with the gRPC error
        await expect(service.squeezeCheese()).rejects.toThrow('gRPC Error');
    });
});
