

const initialState = {
    operation: "GET",
    status:false
};


export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                ...action.data,
                data:"",
                status: false
            };

        case "SEND_FULFILLED":
            return {
                ...state,
                data: action.payload.data,
                status: true
            };

        case "SEND_REJECTED":
            return {
                ...state,
                err: action.payload.response.data,
                status: false,
                data: "",
                status: true
            };

        default:
            return state;
    }
};

export default reducers;