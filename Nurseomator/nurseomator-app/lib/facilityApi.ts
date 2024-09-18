import axios from 'axios';

class FacilityApi {
    public facilityApi;

    constructor() {
        this.facilityApi = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL });
    }

    getList = async () => {
        try {
            const { data } = await this.facilityApi.get('/facility/list');
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'An error occured');
        }
    };
}

export default new FacilityApi();
