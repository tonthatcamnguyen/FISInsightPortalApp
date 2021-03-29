import { Alert } from "react-native";

import {
    POST_LOGIN,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE
} from "../../../actions/ActionTypes";

import { takeEvery, put } from "redux-saga/effects";

import { loginRequire } from "../../api/login/Login";

function* loginFlow(action) {
    const { user, password } = action.data;
    console.log("loginFlow", user + "|" + password)
    try {
        const response = yield loginRequire(user.toString().trim(), password.toString().trim())

        if (response !== undefined && response !== null) {
            if (response.resultCode === 1) {
                yield put({
                    type: POST_LOGIN_SUCCESS,
                    response
                })
            } else {
                yield put({
                    type: POST_LOGIN_FAILURE,
                    error: response.message
                })
                Alert.alert("Lỗi", response.message)

            }
        } else {
            put({
                type: POST_LOGIN_FAILURE,
                error: 'Có lỗi'
            })
            Alert.alert("Không nhận được response", response.message)

        }
    } catch (error) {
        yield put({
            type: POST_LOGIN_FAILURE,
            error: "Lỗi xảy ra ở server"
        })
        Alert.alert("Lỗi server", response.message)
    }
}

export function* watchLogin() {
    yield takeEvery(POST_LOGIN, loginFlow)
}