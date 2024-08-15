import PierreCommunicationService from '../src/services/pierre-communication.service';
import { PoutineDeliveryService } from '../src/services/poutine-delivery.service';

describe('PoutineDeliveryService', () => {
    let mockPierreService: jest.Mocked<PierreCommunicationService>;
    let service: PoutineDeliveryService;

    beforeEach(() => {
        // Create a mocked instance of PierreCommunicationService
        mockPierreService = {
            sendPoutine: jest.fn(),
        } as unknown as jest.Mocked<PierreCommunicationService>;

        // Mock the getInstance method to return the mocked instance
        jest.spyOn(PierreCommunicationService, 'getInstance').mockReturnValue(mockPierreService);
        // Create a new instance of the PoutineDeliveryService
        service = new PoutineDeliveryService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call sendPoutine on PierreCommunicationService with the correct parameters and return the result', async () => {
        const mockResponse = 'Poutine sent successfully';

        // Mock the sendPoutine method to return the mockResponse
        mockPierreService.sendPoutine.mockResolvedValue(mockResponse);

        const result = await service.sendPoutine(true);

        // Check that sendPoutine was called with the correct parameters
        expect(mockPierreService.sendPoutine).toHaveBeenCalledWith(true);
        expect(result).toBe(mockResponse);
    });

    it('should handle errors from PierreCommunicationService.sendPoutine correctly', async () => {
        const mockError = new Error('Error sending poutine');

        // Mock the sendPoutine method to throw an error
        mockPierreService.sendPoutine.mockRejectedValue(mockError);

        const result = await service.sendPoutine(true);

        // Check that sendPoutine was called with the correct parameters
        expect(mockPierreService.sendPoutine).toHaveBeenCalledWith(true);
        expect(result).toBe(""); // Ensure the result is an empty string on error
    });
});
