import React from 'react';
import './style.scss';
import utils from '../../resources/utils';
import { Toast, AppRoot } from '../../common/toast-portals';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        username: ``,
        password: '',
        // checked: false
        showToast: false,
        text: ''
    }

    inputUsername = event => {
        this.setState({
            username: event.target.value
        });
    }
    inputPassword = event => {
        this.setState({
            password: event.target.value
        });
    }
    closeLogin = () => {
        this.props.history.goBack();
    }
    login = () => {
        const params = {
            userId: this.state.username,
            password: this.state.password
        };
        utils.getPromise(`http://localhost:8080/login`, params).then(json => {
            if (json) {
                json = JSON.parse(json);
                // 已存进cookie，表示登陆成功或在线
                if (document.cookie.indexOf('userId') !== -1 && json === '登陆成功！') {
                    this.setState({
                        showToast: false,
                        text: json
                    }, ()=>{
                        this.setState({
                            showToast: true
                        }, ()=>{
                            setTimeout(()=>{
                                this.closeLogin();
                            }, 300);
                        });
                    });
                } else {
                    this.setState({
                        showToast: false, // 先卸载Toast以便其重新读取props
                        text: json
                    }, ()=>{
                        this.setState({
                            showToast: true
                        });
                    });
                }
            }
        });
    }
    render() {
        return (
            <div className="login">
                <div className="title">
                    <span className="close" onClick={this.closeLogin}>关闭</span>
                    <span className="sign-in">登录</span>
                </div>
                {/* <div className="fb-login">Sign in with Facebook</div> */}
                {/* <div className="or">--- 登陆 ---</div> */}
                <input className="username" onChange={this.inputUsername} placeholder={'姓名/邮箱/电话'} type="text" value={this.state.username}/>
                <input className="password" onChange={this.inputPassword}  placeholder={'密码'} type="password" value={this.state.password}/>
                <div className="prompt">
                    <span>记住我</span>
                    <span>忘记密码</span>
                </div>
                <div className="comfirm" onClick={this.login}>登录</div>
                <div className="register">
                    <span className="tip">{`还没有账户?`}</span>
                    <span className="register-btn">{`注册>>`}</span>
                </div>
                {this.state.showToast && <Toast text={this.state.text} time = {2000}/>}
            </div>
        );
    }
}
