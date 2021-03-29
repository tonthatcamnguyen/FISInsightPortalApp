import React from 'react'
import CreateClass from '../../components/class/CreateClass'
import { connect } from "react-redux";
import { buildingAction, addClassAction, classAction, editClassAction } from "../../redux/actions/Index";
import { bindActionCreators } from "redux";

class CreateClassContainer extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    render() {
        return (
            <CreateClass {...this.props}></CreateClass>
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
            addClassAction,
            classAction,
            editClassAction
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(CreateClassContainer)