import { Alert } from "react-native";

import {
    GET_BUILDING,
    GET_BUILDING_SUCCESS,
    GET_BUILDING_FAILURE
} from "../../../actions/ActionTypes";

import { takeEvery, put, takeLatest } from "redux-saga/effects";

import { getBuilding } from "../../api/building/Building";

function* buildingFlow(action) {
    const { token } = action.data;
    try {
        const response = yield getBuilding(token.toString().trim())

        if (response !== undefined && response !== null) {
            if (response.resultCode === 1) {
                yield put({
                    type: GET_BUILDING_SUCCESS,
                    response
                })
            } else {
                yield put({
                    type: GET_BUILDING_FAILURE,
                    error: response.message
                })
                Alert.alert("Lỗi response", response.message)

            }
        } else {
            put({
                type: GET_BUILDING_FAILURE,
                error: 'Có lỗi'
            })
            Alert.alert("Không nhận được response", response.message)

        }
    } catch (error) {
        yield put({
            type: GET_BUILDING_FAILURE,
            error: "Lỗi xảy ra ở server"
        })
        Alert.alert("Lỗi server", response.message)
    }
}

export function* watchBuilding() {
    yield takeEvery(GET_BUILDING, buildingFlow)
}