import React from 'react'
import Class from '../../components/class/Class'
import { connect } from "react-redux";
import { classAction,deleteClassAction } from "../../redux/actions/Index";
import { bindActionCreators } from "redux";

class ClassContainer extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    render() {
        return (
            <Class {...this.props}></Class>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.classReducers.data,
        loading: state.classReducers.loading,
        error: state.classReducers.error,
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            classAction ,
            deleteClassAction
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(ClassContainer)