import React from 'react'
import Login from '../../components/login/Login'
import { connect } from "react-redux";
import { loginAction } from "../../redux/actions/Index";
import { bindActionCreators } from "redux";

class LoginContainer extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    render() {
        return (
            <Login {...this.props}></Login>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.loginReducers.data,
        loading: state.loginReducers.loading,
        error: state.loginReducers.error
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            loginAction,
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)