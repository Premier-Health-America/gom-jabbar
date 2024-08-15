import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import PierreCommunicationService from '../src/services/pierre-communication.service';

jest.mock('@grpc/grpc-js');
jest.mock('@grpc/proto-loader');

describe('PierreCommunicationService', () => {
    let mockClient: any;
    let service: PierreCommunicationService;

    beforeEach(() => {
        mockClient = {
            mixPoutine: jest.fn(),
            sendPoutine: jest.fn(),
        };

        // Mock the gRPC and protoLoader modules
        const mockGrpcLoadPackageDefinition = jest.fn().mockReturnValue({
            pierre: {
                PierreService: jest.fn(() => mockClient),
            },
        });

        (protoLoader.loadSync as jest.Mock).mockReturnValue({});
        (grpc.loadPackageDefinition as jest.Mock).mockImplementation(mockGrpcLoadPackageDefinition);

        // Create a new instance of the service for each test
        service = new PierreCommunicationService('localhost:50056');

        // Mock the getInstance method to return the fresh instance
        jest.spyOn(PierreCommunicationService, 'getInstance').mockReturnValue(service);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call mixPoutine on the client with the correct parameters and return the result', async () => {
        const mockResponse = { result: 'Poutine mixed' };

        // Mock the mixPoutine method to call the callback immediately
        mockClient.mixPoutine.mockImplementation((data: any, callback: any) => {
            callback(null, mockResponse); // Simulate success by calling the callback with null error
        });

        const response = await service.mixPoutine(5, 8, 'canola', 150);

        // Check that mixPoutine was called with the correct parameters
        expect(mockClient.mixPoutine).toHaveBeenCalledWith(
            { potatoSize: 5, potatoSoftnessLevel: 8, oilType: 'canola', specificTemperature: 150 },
            expect.any(Function), 
        );
        expect(response).toEqual(mockResponse);
    });

    it('should call sendPoutine on the client with the correct parameters and return the result', async () => {
        const mockResponse = { result: 'Poutine sent' };

        // Mock the sendPoutine method to call the callback immediately
        mockClient.sendPoutine.mockImplementation((data: any, callback: any) => {
            callback(null, mockResponse); // Simulate success
        });

        const response = await service.sendPoutine(true);

        // Check that sendPoutine was called with the correct parameters
        expect(mockClient.sendPoutine).toHaveBeenCalledWith(
            { drunkIsDetected: true },
            expect.any(Function), // Ensure it was called with a function
        );
        expect(response).toEqual(mockResponse);
    });

    it('should handle gRPC errors in mixPoutine correctly', async () => {
        const mockError = new Error('gRPC Error');

        // Mock the mixPoutine method to simulate an error
        mockClient.mixPoutine.mockImplementation((data: any, callback: any) => {
            callback(mockError, null); // Simulate error
        });

        // Expect the promise to reject with the gRPC error
        await expect(service.mixPoutine(5, 8, 'canola', 150)).rejects.toThrow('gRPC Error');
    });

    it('should handle gRPC errors in sendPoutine correctly', async () => {
        const mockError = new Error('gRPC Error');

        // Mock the sendPoutine method to simulate an error
        mockClient.sendPoutine.mockImplementation((data: any, callback: any) => {
            callback(mockError, null); // Simulate error
        });

        // Expect the promise to reject with the gRPC error
        await expect(service.sendPoutine(true)).rejects.toThrow('gRPC Error');
    });
});
