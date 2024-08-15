import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import BizarCommunicationService from '../src/services/bizar-communication.service';

jest.mock('@grpc/grpc-js');
jest.mock('@grpc/proto-loader');

describe('BizarCommunicationService', () => {
    let mockClient: any;
    let service: BizarCommunicationService;

    beforeEach(() => {
        mockClient = {
            fryPotatoes: jest.fn(),
        };

        // Mock the gRPC and protoLoader modules
        const mockGrpcLoadPackageDefinition = jest.fn().mockReturnValue({
            bizar: {
                BizarService: jest.fn(() => mockClient),
            },
        });

        (protoLoader.loadSync as jest.Mock).mockReturnValue({});
        (grpc.loadPackageDefinition as jest.Mock).mockImplementation(mockGrpcLoadPackageDefinition);

        // Create a new instance of the service for each test
        service = new BizarCommunicationService('localhost:50054');
        
        jest.spyOn(BizarCommunicationService, 'getInstance').mockReturnValue(service);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call fryPotatoes on the client with the correct parameters', async () => {
        const mockResponse = { result: 'Potatoes fried' };

        // Mock the fryPotatoes method to call the callback immediately
        mockClient.fryPotatoes.mockImplementation((data: any, callback: any) => {
            callback(null, mockResponse); // Simulate success by calling the callback with null error
        });

        const response = await service.fryPotatoes('canola');

        // Check that fryPotatoes was called with the correct parameters
        expect(mockClient.fryPotatoes).toHaveBeenCalledWith(
            { oilType: 'canola' },
            expect.any(Function),
        );
        expect(response).toEqual(mockResponse);
    });

    it('should handle gRPC errors correctly', async () => {
        const mockError = new Error('gRPC Error');

        mockClient.fryPotatoes.mockImplementation((data: any, callback: any) => {
            callback(mockError, null); // Simulate error by calling the callback with an error
        });

        // Expect the promise to reject with the gRPC error
        await expect(service.fryPotatoes('canola')).rejects.toThrow('gRPC Error');
    });
});
