import axios from 'axios';

class LocationApi {
    public locationApi;

    constructor() {
        this.locationApi = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL });
    }

    getStatusOptions = async () => {
        try {
            const { data } = await this.locationApi.get('/location/status-options');
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'An error occured');
        }
    };

    getStatusIcon = (label: string) => {
        const iconMap: { [key: string]: string } = {
            SOS: 'alert',
            'At rest': 'sleep',
            'In motion': 'walk',
            'Patient care': 'heart',
        };

        return iconMap[label] || 'send';
    };

    reportLocation = async ({
        body,
        token,
    }: {
        body: {
            latitude: number;
            longitude: number;
            status: string;
        };
        token: string;
    }): Promise<any> => {
        try {
            const { data } = await this.locationApi.post('/location/report', body, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'An error occurred');
        }
    };
}

export default new LocationApi();
