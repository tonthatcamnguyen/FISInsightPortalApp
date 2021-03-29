import {
    POST_EDIT_CLASS,
    POST_EDIT_CLASS_SUCCESS,
    POST_EDIT_CLASS_FAILURE
} from '../../actions/ActionTypes'

const initState = {
    loading: false,
    data: null,
    error: null
}

const editClassReducers = (state = initState, action) => {
    switch (action.type) {
        case POST_EDIT_CLASS:
            return {
                loading: true,
                data: null,
                error: null
            }
        case POST_EDIT_CLASS_SUCCESS:
            return {
                loading: false,
                data: action.response,
                error: null
            }
        case POST_EDIT_CLASS_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.error
            }
        default:
            return state;
    }
}
export default editClassReducers