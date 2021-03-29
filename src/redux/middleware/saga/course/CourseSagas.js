import { Alert } from "react-native";

import {
    GET_COURSE,
    GET_COURSE_SUCCESS,
    GET_COURSE_FAILURE
} from "../../../actions/ActionTypes";

import { takeEvery, put, takeLatest } from "redux-saga/effects";

import { getCourse } from "../../api/course/Course";

function* courseFlow(action) {
    const { token } = action.data;
    try {
        const response = yield getCourse(token.toString().trim())

        if (response !== undefined && response !== null) {
            if (response.resultCode === 1) {
                yield put({
                    type: GET_COURSE_SUCCESS,
                    response
                })


            } else {
                yield put({
                    type: GET_COURSE_FAILURE,
                    error: response.message
                })
                Alert.alert("Lỗi response", response.message)

            }
        } else {
            put({
                type: GET_COURSE_FAILURE,
                error: 'Có lỗi'
            })
            Alert.alert("Không nhận được response", response.message)

        }
    } catch (error) {
        yield put({
            type: GET_COURSE_FAILURE,
            error: "Lỗi xảy ra ở server"
        })
        Alert.alert("Lỗi server", error.message)
    }
}

export function* watchCourse() {
    yield takeEvery(GET_COURSE, courseFlow)
}