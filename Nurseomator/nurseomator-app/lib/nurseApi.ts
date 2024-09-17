import axios from 'axios';
class NurseApi {
    public nurseApi;

    constructor() {
        this.nurseApi = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL });
    }

    login = async (body: any) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            const { data } = await this.nurseApi.post('/nurse/login', body);
            console.log('data', data);
            return data;
        } catch (error: any) {
            throw new Error(error.response.data.message);
        }
    };

    register = async (body: any) => {
        try {
            const { data } = await this.nurseApi.post('/nurse/register', body);
            console.log('data', data);
            return data;
        } catch (error: any) {
            throw new Error(error.response.data.message);
        }
    };

    getNurse = async ({ token }: any) => {
        try {
            const { data } = await this.nurseApi.get('/nurse', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('data', data);
            return data;
        } catch (error: any) {
            throw new Error(error.response.data.message);
        }
    };
}

export default new NurseApi();
