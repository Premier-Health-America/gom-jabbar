import axios from 'axios';
class NurseApi {
    public nurseApi;

    constructor() {
        this.nurseApi = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL });
    }

    login = async (body: any) => {
        try {
            const { data } = await this.nurseApi.post('/nurse/login', body);
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'An error occured');
        }
    };

    register = async (body: any) => {
        try {
            const { data } = await this.nurseApi.post('/nurse/register', body);
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'An error occured');
        }
    };

    getNurse = async ({ token }: any) => {
        try {
            const { data } = await this.nurseApi.get('/nurse', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'An error occured');
        }
    };
}

export default new NurseApi();
