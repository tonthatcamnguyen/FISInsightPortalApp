import { Alert } from "react-native";

import {
    POST_ADD_CLASS,
    POST_ADD_CLASS_SUCCESS,
    POST_ADD_CLASS_FAILURE
} from "../../../actions/ActionTypes";

import { takeEvery, put, takeLatest } from "redux-saga/effects";

import { postAddClass } from "../../api/class/AddClass";

function* addClassFlow(action) {
    const { token, data } = action.data;
    try {

        const response = yield postAddClass(token.toString().trim(), data)
        if (response !== undefined && response !== null) {
            if (response.resultCode === 1) {
                yield put({
                    type: POST_ADD_CLASS_SUCCESS,
                    response
                })
            } else {
                yield put({
                    type: POST_ADD_CLASS_FAILURE,
                    error: response.message
                })
                Alert.alert("Lỗi response addClassFlow", response.message)

            }
        } else {
            put({
                type: POST_ADD_CLASS_FAILURE,
                error: 'Có lỗi'
            })
            Alert.alert("Không nhận được response", response.message)

        }
    } catch (error) {
        yield put({
            type: POST_ADD_CLASS_FAILURE,
            error: "Lỗi xảy ra ở server"
        })
        Alert.alert("Lỗi server", error.message)
    }
}

export function* watchAddClass() {
    yield takeEvery(POST_ADD_CLASS, addClassFlow)
}