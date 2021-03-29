import {
    GET_DELETE_COURSE,
    GET_DELETE_COURSE_SUCCESS,
    GET_DELETE_COURSE_FAILURE
} from '../../actions/ActionTypes'

const initState = {
    loading: false,
    data: null,
    error: null
}

const deleteCourseReducers = (state = initState, action) => {
    switch (action.type) {
        case GET_DELETE_COURSE:
            return {
                loading: true,
                data: null,
                error: null
            }
        case GET_DELETE_COURSE_SUCCESS:
            return {
                loading: false,
                data: action.response,
                error: null
            }
        case GET_DELETE_COURSE_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.error
            }
        default:
            return state;
    }
}
export default deleteCourseReducers