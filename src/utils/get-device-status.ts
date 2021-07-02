import axios from "axios";

const getDeviceStatus = async (deviceUrl) => {
    try {
        const deviceStatus = await axios.get(`http://${deviceUrl}/status`);

        return deviceStatus.data;
    } catch {
        return false;
    }
};

export default getDeviceStatus;