import { Alert } from "react-native";

import {
    GET_CLASS,
    GET_CLASS_SUCCESS,
    GET_CLASS_FAILURE
} from "../../../actions/ActionTypes";

import { takeEvery, put, takeLatest } from "redux-saga/effects";

import { getClass } from "../../api/class/Class";

function* classFlow(action) {
    const { token, courseId } = action.data;
    try {
        const response = yield getClass(token.toString().trim(), courseId.toString())
        if (response !== undefined && response !== null) {
            if (response.resultCode === 1) {
                yield put({
                    type: GET_CLASS_SUCCESS,
                    response
                })
            } else {
                yield put({
                    type: GET_CLASS_FAILURE,
                    error: response.message
                })
                Alert.alert("Lỗi response lessonFlow", response.message)

            }
        } else {
            put({
                type: GET_CLASS_FAILURE,
                error: 'Có lỗi'
            })
            Alert.alert("Không nhận được response", response.message)

        }
    } catch (error) {
        yield put({
            type: GET_CLASS_FAILURE,
            error: "Lỗi xảy ra ở server"
        })
        Alert.alert("Lỗi server", error.message)
    }
}

export function* watchClass() {
    yield takeEvery(GET_CLASS, classFlow)
}