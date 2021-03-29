import { all } from 'redux-saga/effects';
import { watchLogin } from "./login/LoginSagas";
import { watchCourse } from "./course/CourseSagas";
import { watchBuilding } from "./building/BuildingSagas";
import { watchAddCourse } from "./course/AddCourseSagas";
import { watchDeleteCourse } from "./course/DeleteCourseSagas";
import { watchEditCourse } from "./course/EditCourseSagas";
import { watchClass } from "./class/ClassSagas";
import { watchAddClass } from "./class/AddClassSagas";
import { watchEditClass } from "./class/EditClassSagas";
import { watchDeleteClass } from "./class/DeleteClassSagas";


export default function* rootSaga() {
    yield all([
        watchLogin(),

        watchCourse(),
        watchBuilding(),
        watchAddCourse(),
        watchDeleteCourse(),
        watchEditCourse(),

        watchClass(),
        watchAddClass(),
        watchEditClass(),
        watchDeleteClass()
    ])
}