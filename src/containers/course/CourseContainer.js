import React from 'react'
import Course from '../../components/course/Course'
import { connect } from "react-redux";
import { courseAction,deleteCourseAction } from "../../redux/actions/Index";
import { bindActionCreators } from "redux";

class CourseContainer extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    render() {
        return (
            <Course {...this.props}></Course>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.courseReducers.data,
        loading: state.courseReducers.loading,
        error: state.courseReducers.error,
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            courseAction,
            deleteCourseAction
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer)