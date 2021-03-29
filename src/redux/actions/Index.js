import {
    POST_LOGIN,
    GET_COURSE,
    GET_BUILDING,
    POST_ADD_COURSE,
    GET_DELETE_COURSE,
    POST_EDIT_COURSE,
    GET_CLASS,
    POST_ADD_CLASS,
    POST_EDIT_CLASS,
    GET_DELETE_CLASS
} from "./ActionTypes";

// ------------------------------- Login -------------------------------
export const loginAction = (user, password) => {
    console.log("loginAction", user + "|" + password)
    return {
        type: POST_LOGIN,
        data: { user, password }
    }
}

// ------------------------------- Course -------------------------------
export const courseAction = (token) => {
    return {
        type: GET_COURSE,
        data: { token }
    }
}

// ------------------------------- Building -------------------------------
export const buildingAction = (token) => {
    return {
        type: GET_BUILDING,
        data: { token }
    }
}

// ------------------------------- Add Course -------------------------------
export const addCourseAction = (token, object) => {
    return {
        type: POST_ADD_COURSE,
        data: { token, object }
    }
}

// ------------------------------- Delete Course -------------------------------
export const deleteCourseAction = (token, courseId) => {
    return {
        type: GET_DELETE_COURSE,
        data: { token, courseId }
    }
}

// ------------------------------- Edit Course -------------------------------
export const editCourseAction = (token, data) => {
    return {
        type: POST_EDIT_COURSE,
        data: { token, data }
    }
}

// ------------------------------- Class -------------------------------
export const classAction = (token, courseId) => {
    return {
        type: GET_CLASS,
        data: { token, courseId }
    }
}

// ------------------------------- Add Class -------------------------------
export const addClassAction = (token, data) => {
    return {
        type: POST_ADD_CLASS,
        data: { token, data }
    }
}

// ------------------------------- Edit Class -------------------------------
export const editClassAction = (token, data) => {
    return {
        type: POST_EDIT_CLASS,
        data: { token, data }
    }
}

// ------------------------------- Delete Class -------------------------------
export const deleteClassAction = (token, classId) => {
    return {
        type: GET_DELETE_CLASS,
        data: { token, classId }
    }
}