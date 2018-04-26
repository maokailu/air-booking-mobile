import React from 'react';
import './style.scss';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        username: `Email/Username/Phone`,
        password: 'Password'
    }

    inputUsername = event => {
        this.setState({
            username: event.target.value
        });
    }
    inputPassword = () => {
        this.setState({
            password: event.target.value
        });
    }
    closeLogin = () => {
    }
    render() {
        return (
            <div className="login">
                <div className="title">
                    <span className="close" onClick={this.closeLogin}>关闭</span>
                    <span className="sign-in">Sign in</span>
                </div>
                <div className="fb-login">Sign in with Facebook</div>
                <div className="or">--- Or ---</div>
                <div className="username" contentEditable = "true" onInput={this.inputUsername}>{this.state.username}</div>
                <div className="password" contentEditable = "true" onInput={this.inputPassword}>{this.state.password}</div>
                <div className="prompt">
                    <span>Remember me</span>
                    <span>Forget password</span>
                </div>
                <div className="comfirm">Sign in</div>
                <div className="register">
                    <span className="tip">{`Don't have a Trip com account?`}</span>
                    <span className="btn">{`Register>>`}</span>
                </div>
            </div>
        );
    }
}
