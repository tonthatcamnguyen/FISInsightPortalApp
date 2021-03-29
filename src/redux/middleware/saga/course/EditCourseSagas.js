import { Alert } from "react-native";

import {
    POST_EDIT_COURSE,
    POST_EDIT_COURSE_SUCCESS,
    POST_EDIT_COURSE_FAILURE
} from "../../../actions/ActionTypes";

import { takeEvery, put, takeLatest } from "redux-saga/effects";

import { postEditCourse } from "../../api/course/EditCourse";

function* editCourseFlow(action) {
    const { token, data } = action.data;
    try {

        const response = yield postEditCourse(token.toString().trim(), data)
        if (response !== undefined && response !== null) {
            if (response.resultCode === 1) {
                yield put({
                    type: POST_EDIT_COURSE_SUCCESS,
                    response
                })
            } else {
                yield put({
                    type: POST_EDIT_COURSE_FAILURE,
                    error: response.message
                })
                Alert.alert("Lỗi response editCourseFlow", response.message)

            }
        } else {
            put({
                type: POST_EDIT_COURSE_FAILURE,
                error: 'Có lỗi'
            })
            Alert.alert("Không nhận được response", response.message)

        }
    } catch (error) {
        yield put({
            type: POST_EDIT_COURSE_FAILURE,
            error: "Lỗi xảy ra ở server"
        })
        Alert.alert("Lỗi server", error.message)
    }
}

export function* watchEditCourse() {
    yield takeEvery(POST_EDIT_COURSE, editCourseFlow)
}