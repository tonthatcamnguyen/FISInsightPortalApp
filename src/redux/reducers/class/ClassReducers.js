import {
    GET_CLASS,
    GET_CLASS_SUCCESS,
    GET_CLASS_FAILURE
} from '../../actions/ActionTypes'

const initState = {
    loading: false,
    data: null,
    error: null
}

const classReducers = (state = initState, action) => {
    switch (action.type) {
        case GET_CLASS:
            return {
                loading: true,
                data: null,
                error: null
            }
        case GET_CLASS_SUCCESS:
            return {
                loading: false,
                data: action.response,
                error: null
            }
        case GET_CLASS_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.error
            }
        default:
            return state;
    }
}
export default classReducers