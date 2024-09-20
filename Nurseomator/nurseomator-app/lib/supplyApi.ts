import axios from 'axios';

class SupplyApi {
    public supplyApi;

    constructor() {
        this.supplyApi = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL });
    }

    getMySupplies = async ({ token }: any) => {
        try {
            const { data } = await this.supplyApi.get('/supply/my-supplies', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'An error occured');
        }
    };

    getMyHistory = async ({ token }: any) => {
        try {
            const { data } = await this.supplyApi.get('/supply/my-history', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'An error occured');
        }
    };

    restock = async ({ token, body }: any) => {
        try {
            const { data } = await this.supplyApi.post('/supply/restock', body, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'An error occured');
        }
    };

    consumption = async ({ token, body }: any) => {
        try {
            const { data } = await this.supplyApi.post('/supply/consumption', body, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'An error occured');
        }
    };
}

export default new SupplyApi();
