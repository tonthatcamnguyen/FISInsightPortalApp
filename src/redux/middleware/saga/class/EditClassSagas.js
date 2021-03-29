import { Alert } from "react-native";

import {
    POST_EDIT_CLASS,
    POST_EDIT_CLASS_SUCCESS,
    POST_EDIT_CLASS_FAILURE
} from "../../../actions/ActionTypes";

import { takeEvery, put, takeLatest } from "redux-saga/effects";

import { postEditClass } from "../../api/class/EditClass";

function* editClassFlow(action) {
    const { token, data } = action.data;
    try {

        const response = yield postEditClass(token.toString().trim(), data)
        if (response !== undefined && response !== null) {
            if (response.resultCode === 1) {
                yield put({
                    type: POST_EDIT_CLASS_SUCCESS,
                    response
                })
            } else {
                yield put({
                    type: POST_EDIT_CLASS_FAILURE,
                    error: response.message
                })
                Alert.alert("Lỗi response editClassFlow", response.message)

            }
        } else {
            put({
                type: POST_EDIT_CLASS_FAILURE,
                error: 'Có lỗi'
            })
            Alert.alert("Không nhận được response", response.message)

        }
    } catch (error) {
        yield put({
            type: POST_EDIT_CLASS_FAILURE,
            error: "Lỗi xảy ra ở server"
        })
        Alert.alert("Lỗi server", error.message)
    }
}

export function* watchEditClass() {
    yield takeEvery(POST_EDIT_CLASS, editClassFlow)
}