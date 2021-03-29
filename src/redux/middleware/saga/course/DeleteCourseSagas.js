import { Alert } from "react-native";

import {
    GET_DELETE_COURSE,
    GET_DELETE_COURSE_SUCCESS,
    GET_DELETE_COURSE_FAILURE
} from "../../../actions/ActionTypes";

import { takeEvery, put, takeLatest } from "redux-saga/effects";

import { getDeleteCourse } from "../../api/course/DeleteCourse";

function* deleteCourseFlow(action) {
    const { token, courseId } = action.data;
    try {
        const response = yield getDeleteCourse(token.toString().trim(), courseId.toString())
        if (response !== undefined && response !== null) {
            if (response.resultCode === 1) {
                yield put({
                    type: GET_DELETE_COURSE_SUCCESS,
                    response
                })
            } else {
                yield put({
                    type: GET_DELETE_COURSE_FAILURE,
                    error: response.message
                })
                Alert.alert("Lỗi response deleteCourseFlow", response.message)

            }
        } else {
            put({
                type: GET_DELETE_COURSE_FAILURE,
                error: 'Có lỗi'
            })
            Alert.alert("Không nhận được response", response.message)

        }
    } catch (error) {
        yield put({
            type: GET_DELETE_COURSE_FAILURE,
            error: "Lỗi xảy ra ở server"
        })
        Alert.alert("Lỗi server", error.message)
    }
}

export function* watchDeleteCourse() {
    yield takeEvery(GET_DELETE_COURSE, deleteCourseFlow)
}