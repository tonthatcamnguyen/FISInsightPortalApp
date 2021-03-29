import { Alert } from "react-native";

import {
    GET_DELETE_CLASS,
    GET_DELETE_CLASS_SUCCESS,
    GET_DELETE_CLASS_FAILURE
} from "../../../actions/ActionTypes";

import { takeEvery, put, takeLatest } from "redux-saga/effects";

import { getDeleteClass } from "../../api/class/DeleteClass";

function* deleteClassFlow(action) {
    const { token, classId } = action.data;
    try {
        const response = yield getDeleteClass(token.toString().trim(), classId.toString())
        if (response !== undefined && response !== null) {
            if (response.resultCode === 1) {
                yield put({
                    type: GET_DELETE_CLASS_SUCCESS,
                    response
                })
            } else {
                yield put({
                    type: GET_DELETE_CLASS_FAILURE,
                    error: response.message
                })
                Alert.alert("Lỗi response deleteClassFlow", response.message)

            }
        } else {
            put({
                type: GET_DELETE_CLASS_FAILURE,
                error: 'Có lỗi'
            })
            Alert.alert("Không nhận được response", response.message)

        }
    } catch (error) {
        yield put({
            type: GET_DELETE_CLASS_FAILURE,
            error: "Lỗi xảy ra ở server"
        })
        Alert.alert("Lỗi server", error.message)
    }
}

export function* watchDeleteClass() {
    yield takeEvery(GET_DELETE_CLASS, deleteClassFlow)
}