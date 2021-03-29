import {
    GET_DELETE_CLASS,
    GET_DELETE_CLASS_SUCCESS,
    GET_DELETE_CLASS_FAILURE
} from '../../actions/ActionTypes'

const initState = {
    loading: false,
    data: null,
    error: null
}

const deleteClassReducers = (state = initState, action) => {
    switch (action.type) {
        case GET_DELETE_CLASS:
            return {
                loading: true,
                data: null,
                error: null
            }
        case GET_DELETE_CLASS_SUCCESS:
            return {
                loading: false,
                data: action.response,
                error: null
            }
        case GET_DELETE_CLASS_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.error
            }
        default:
            return state;
    }
}
export default deleteClassReducers