import React from 'react'
import CreateCourse from '../../components/course/CreateCourse'
import { connect } from "react-redux";
import { buildingAction,addCourseAction,courseAction,editCourseAction } from "../../redux/actions/Index";
import { bindActionCreators } from "redux";

class CreateCourseContainer extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    render() {
        return (
            <CreateCourse {...this.props}></CreateCourse>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.buildingReducers.data,
        loading: state.buildingReducers.loading,
        error: state.buildingReducers.error,
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            buildingAction,
            addCourseAction,
            courseAction,
            editCourseAction
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourseContainer)