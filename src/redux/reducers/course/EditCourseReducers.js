import {
    POST_EDIT_COURSE,
    POST_EDIT_COURSE_SUCCESS,
    POST_EDIT_COURSE_FAILURE
} from '../../actions/ActionTypes'

const initState = {
    loading: false,
    data: null,
    error: null
}

const editCourseReducers = (state = initState, action) => {
    switch (action.type) {
        case POST_EDIT_COURSE:
            return {
                loading: true,
                data: null,
                error: null
            }
        case POST_EDIT_COURSE_SUCCESS:
            return {
                loading: false,
                data: action.response,
                error: null
            }
        case POST_EDIT_COURSE_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.error
            }
        default:
            return state;
    }
}
export default editCourseReducers