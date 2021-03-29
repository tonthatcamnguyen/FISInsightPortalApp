import { all } from 'redux-saga/effects';

import { watchLogin } from './loginSagas';


export default function* rootSaga() {
    yield all([
        watchLogin(),
    ]);
}