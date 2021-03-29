import loginReducers from './login/LoginReducers'
import courseReducers from './course/CourseReducers'
import buildingReducers from './building/BuildingReducers'
import addCourseReducers from './course/AddCourseReducers'
import deleteCourseReducers from './course/DeleteCourseReducers'
import editCourseReducers from './course/EditCourseReducers'
import classReducers from './class/ClassReducers'
import addClassReducers from './class/AddClassReducers'
import editClassReducers from './class/EditClassReducers'
import deleteClassReducers from './class/DeleteReducers'
import { combineReducers } from 'redux';



const allReducers = combineReducers({

    loginReducers,

    courseReducers,
    buildingReducers,
    addCourseReducers,
    deleteCourseReducers,
    editCourseReducers,

    classReducers,
    addClassReducers,
    editClassReducers,
    deleteClassReducers
});

export default allReducers;