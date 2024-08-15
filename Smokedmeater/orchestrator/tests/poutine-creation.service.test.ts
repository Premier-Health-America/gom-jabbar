import { PoutineCreationService } from '../src/services/poutine-creation.service'
import OutremonaCommunicationService from '../src/services/outremona-communication.service'
import VerdunyCommunicationService from '../src/services/verduny-communication.service'
import NordoCommunicationService from '../src/services/nordo-communication.service'
import BizarCommunicationService from '../src/services/bizar-communication.service';
import OldoportoCommunicationService from '../src/services/oldoporto-communication.service'
import PierreCommunicationService from '../src/services/pierre-communication.service'

describe('PoutineCreationService', () => {
    let mockOutremonaService: jest.Mocked<OutremonaCommunicationService>;
    let mockVerdunyService: jest.Mocked<VerdunyCommunicationService>;
    let mockNordoService: jest.Mocked<NordoCommunicationService>;
    let mockBizarService: jest.Mocked<BizarCommunicationService>;
    let mockOldoportoService: jest.Mocked<OldoportoCommunicationService>;
    let mockPierreService: jest.Mocked<PierreCommunicationService>;

    let service: PoutineCreationService;

    beforeEach(() => {
        // Create mocked instances for each service
        mockOutremonaService = { squeezeCheese: jest.fn() } as unknown as jest.Mocked<OutremonaCommunicationService>;
        mockVerdunyService = { cutAndDip: jest.fn() } as unknown as jest.Mocked<VerdunyCommunicationService>;
        mockNordoService = { boilPotatoes: jest.fn() } as unknown as jest.Mocked<NordoCommunicationService>;
        mockBizarService = { fryPotatoes: jest.fn() } as unknown as jest.Mocked<BizarCommunicationService>;
        mockOldoportoService = { keepWarm: jest.fn() } as unknown as jest.Mocked<OldoportoCommunicationService>;
        mockPierreService = { mixPoutine: jest.fn() } as unknown as jest.Mocked<PierreCommunicationService>;

        // Mock the getInstance method to return the mocked instances
        jest.spyOn(OutremonaCommunicationService, 'getInstance').mockReturnValue(mockOutremonaService)
        jest.spyOn(VerdunyCommunicationService, 'getInstance').mockReturnValue(mockVerdunyService)
        jest.spyOn(NordoCommunicationService, 'getInstance').mockReturnValue(mockNordoService)
        jest.spyOn(BizarCommunicationService, 'getInstance').mockReturnValue(mockBizarService)
        jest.spyOn(OldoportoCommunicationService, 'getInstance').mockReturnValue(mockOldoportoService)
        jest.spyOn(PierreCommunicationService, 'getInstance').mockReturnValue(mockPierreService);
        // Create a new instance of the PoutineCreationService
        service = new PoutineCreationService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create poutine by calling all the services with correct parameters and return the result', async () => {
        const mockCheeseResponse = 'Cheese squeezed';
        const mockCutAndDipResponse = 'Potatoes cut and dipped';
        const mockBoilPotatoesResponse = 'Potatoes boiled';
        const mockFryPotatoesResponse = 'Potatoes fried';
        const mockWarmThingsResponse = 'Things warmed';
        const mockMixPoutineResponse = 'Poutine mixed';

        // Mock service methods
        mockOutremonaService.squeezeCheese.mockResolvedValue(mockCheeseResponse);
        mockVerdunyService.cutAndDip.mockResolvedValue(mockCutAndDipResponse);
        mockNordoService.boilPotatoes.mockResolvedValue(mockBoilPotatoesResponse);
        mockBizarService.fryPotatoes.mockResolvedValue(mockFryPotatoesResponse);
        mockOldoportoService.keepWarm.mockResolvedValue(mockWarmThingsResponse);
        mockPierreService.mixPoutine.mockResolvedValue(mockMixPoutineResponse);

        const result = await service.createPoutine(5, 10, 'canola', 75);

        // Check that all service methods were called with the correct parameters
        expect(mockOutremonaService.squeezeCheese).toHaveBeenCalled();
        expect(mockVerdunyService.cutAndDip).toHaveBeenCalledWith(5);
        expect(mockNordoService.boilPotatoes).toHaveBeenCalledWith(10);
        expect(mockBizarService.fryPotatoes).toHaveBeenCalledWith('canola');
        expect(mockOldoportoService.keepWarm).toHaveBeenCalledWith(75);
        expect(mockPierreService.mixPoutine).toHaveBeenCalledWith(5, 10, 'canola', 75);

        // Check that the result is as expected
        expect(result).toBe(mockMixPoutineResponse);
    });

    it('should handle errors from any of the service calls correctly', async () => {
        const mockError = new Error('Error creating poutine');

        // Mock service methods to simulate error
        mockOutremonaService.squeezeCheese.mockResolvedValue('Cheese squeezed');
        mockVerdunyService.cutAndDip.mockResolvedValue('Potatoes cut and dipped');
        mockNordoService.boilPotatoes.mockResolvedValue('Potatoes boiled');
        mockBizarService.fryPotatoes.mockResolvedValue('Potatoes fried');
        mockOldoportoService.keepWarm.mockResolvedValue('Things warmed');
        mockPierreService.mixPoutine.mockRejectedValue(mockError);

        const result = await service.createPoutine(5, 10, 'canola', 75);

        // Check that all service methods were called with the correct parameters
        expect(mockOutremonaService.squeezeCheese).toHaveBeenCalled();
        expect(mockVerdunyService.cutAndDip).toHaveBeenCalledWith(5);
        expect(mockNordoService.boilPotatoes).toHaveBeenCalledWith(10);
        expect(mockBizarService.fryPotatoes).toHaveBeenCalledWith('canola');
        expect(mockOldoportoService.keepWarm).toHaveBeenCalledWith(75);
        expect(mockPierreService.mixPoutine).toHaveBeenCalledWith(5, 10, 'canola', 75);

        // Check that the result is an empty string on error
        expect(result).toBe('');
    });
});
