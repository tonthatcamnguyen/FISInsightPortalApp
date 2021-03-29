import {
    GET_BUILDING,
    GET_BUILDING_SUCCESS,
    GET_BUILDING_FAILURE
} from '../../actions/ActionTypes'

const initState = {
    loading: false,
    data: null,
    error: null
}

const buildingReducers = (state = initState, action) => {
    switch (action.type) {
        case GET_BUILDING:
            return {
                loading: true,
                data: null,
                error: null
            }
        case GET_BUILDING_SUCCESS:
            return {
                loading: false,
                data: action.response,
                error: null
            }
        case GET_BUILDING_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.error
            }
        default:
            return state;
    }
}
export default buildingReducers