import axios from "axios";

export const addToStore = (data) => {
    return {
        type:"ADD",
        data
    };
};

export const sendData = (url, data) => {
    return {
        type:"SEND",
        payload: axios({
            url,
            method:"POST",
            data
        })
    };
};