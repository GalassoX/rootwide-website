import axios from "axios";

export const getSampData = async (token) => {
    const res = await axios({
        method: 'GET',
        url: 'http://localhost:4444/samp',
        headers: {
            authorization: token
        }
    });
    return res.data;
}

export const getSampVehiclesData = async (token) => {
    const res = await axios({
        method: 'GET',
        url: 'http://localhost:4444/samp/vehicles',
        headers: {
            authorization: token
        }
    });
    return res.data;
}