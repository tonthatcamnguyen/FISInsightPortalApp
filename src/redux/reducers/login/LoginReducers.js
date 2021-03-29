import {
    POST_LOGIN,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE
} from '../../actions/ActionTypes'

const initState = {
    loading: false,
    data: null,
    error: null
}

const loginReducers = (state = initState, action) => {
    switch (action.type) {
        case POST_LOGIN:
            return {
                loading: true,
                data: null,
                error: null
            }
        case POST_LOGIN_SUCCESS:
            return {
                loading: false,
                data: action.response,
                error: null
            }
        case POST_LOGIN_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.error
            }
        default:
            return state;
    }
}
export default loginReducers