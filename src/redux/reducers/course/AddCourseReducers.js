import {
    POST_ADD_COURSE,
    POST_ADD_COURSE_SUCCESS,
    POST_ADD_COURSE_FAILURE
} from '../../actions/ActionTypes'

const initState = {
    loading: false,
    data: null,
    error: null
}

const addCourseReducers = (state = initState, action) => {
    switch (action.type) {
        case POST_ADD_COURSE:
            return {
                loading: true,
                data: null,
                error: null
            }
        case POST_ADD_COURSE_SUCCESS:
            return {
                loading: false,
                data: action.response,
                error: null
            }
        case POST_ADD_COURSE_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.error
            }
        default:
            return state;
    }
}
export default addCourseReducers