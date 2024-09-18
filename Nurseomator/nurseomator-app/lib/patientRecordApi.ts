import axios from 'axios';

class PatientRecordApi {
    public patientRecordApi;

    constructor() {
        this.patientRecordApi = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL });
    }

    getListByFacility = async ({ facilityId, token }: any) => {
        try {
            const { data } = await this.patientRecordApi.get(
                `/patient-record/list-for-facility/${facilityId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'An error occured');
        }
    };
}

export default new PatientRecordApi();
