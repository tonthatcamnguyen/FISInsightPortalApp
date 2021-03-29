import { Alert } from "react-native";

import {
    POST_ADD_COURSE,
    POST_ADD_COURSE_SUCCESS,
    POST_ADD_COURSE_FAILURE
} from "../../../actions/ActionTypes";

import { takeEvery, put, takeLatest } from "redux-saga/effects";

import { postAddCourse } from "../../api/course/AddCourse";

function* addCourseFlow(action) {
    const { token, object } = action.data;
    try {

        const response = yield postAddCourse(token.toString().trim(), object)
        if (response !== undefined && response !== null) {
            if (response.resultCode === 1) {
                yield put({
                    type: POST_ADD_COURSE_SUCCESS,
                    response
                })
            } else {
                yield put({
                    type: POST_ADD_COURSE_FAILURE,
                    error: response.message
                })
                Alert.alert("Lỗi response addCourseFlow", response.message)

            }
        } else {
            put({
                type: POST_ADD_COURSE_FAILURE,
                error: 'Có lỗi'
            })
            Alert.alert("Không nhận được response", response.message)

        }
    } catch (error) {
        yield put({
            type: POST_ADD_COURSE_FAILURE,
            error: "Lỗi xảy ra ở server"
        })
        Alert.alert("Lỗi server", error.message)
    }
}

export function* watchAddCourse() {
    yield takeEvery(POST_ADD_COURSE, addCourseFlow)
}