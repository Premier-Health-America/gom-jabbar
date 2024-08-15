import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import NordoCommunicationService from '../src/services/nordo-communication.service';

jest.mock('@grpc/grpc-js');
jest.mock('@grpc/proto-loader');

describe('NordoCommunicationService', () => {
    let mockClient: any;
    let service: NordoCommunicationService;

    beforeEach(() => {
        mockClient = {
            boilPotatoes: jest.fn(),
        };

        // Mock the gRPC and protoLoader modules
        const mockGrpcLoadPackageDefinition = jest.fn().mockReturnValue({
            nordo: {
                NordoService: jest.fn(() => mockClient),
            },
        });

        (protoLoader.loadSync as jest.Mock).mockReturnValue({});
        (grpc.loadPackageDefinition as jest.Mock).mockImplementation(mockGrpcLoadPackageDefinition);

        // Create a new instance of the service for each test
        service = new NordoCommunicationService('localhost:50053');

        jest.spyOn(NordoCommunicationService, 'getInstance').mockReturnValue(service);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call boilPotatoes on the client with the correct parameters', async () => {
        const mockResponse = { result: 'Potatoes boiled' };

        mockClient.boilPotatoes.mockImplementation((data: any, callback: any) => {
            callback(null, mockResponse);
        });

        const response = await service.boilPotatoes(10);

        // Check that boilPotatoes was called with the correct parameters
        expect(mockClient.boilPotatoes).toHaveBeenCalledWith(
            { boilTime: 10 },
            expect.any(Function),
        );
        expect(response).toEqual(mockResponse);
    });

    it('should handle gRPC errors correctly', async () => {
        const mockError = new Error('gRPC Error');

        mockClient.boilPotatoes.mockImplementation((data: any, callback: any) => {
            callback(mockError, null); // Simulate error by calling the callback with an error
        });

        await expect(service.boilPotatoes(10)).rejects.toThrow('gRPC Error');
    });
});
