import { POST_LOGIN, SIGNIN_SUCCESS, SIGNIN_ERROR } from '../../actions/actionTypes';


import { call, takeEvery, put } from 'redux-saga/effects';

import { postLogin } from '../api/login'



function* signInFlow(action) {
  const { user, password } = action.data
  try {
    const response = yield postLogin(user, password)
    console.log(response)
    yield put({ type: SIGNIN_SUCCESS, response })
  } catch (error) {
    console.log("signInFlow")
    console.log(error)
    yield put({ type: SIGNIN_ERROR, error })
  }
}

export function* watchLogin() {
  yield takeEvery(POST_LOGIN, signInFlow);
}