import { GET_LOCATE } from "../actions/Actions";

const initState = {
    pickLocate: {
        longitude: -2.2508792394315735,
        latitude: 53.476051645843704
    }
};

const reducer = (state = initState, action) => {
    switch(action.type){
        case GET_LOCATE:
            console.log("action get locate: ", action);
            let pickLocate = state.pickLocate;
            pickLocate = action.payload;
            return {pickLocate};
        default: 
            return state;
    }

}

export default reducer;