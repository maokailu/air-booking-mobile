import React from 'react';
import './style.scss';
import utils from '../../resources/utils';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        username: ``,
        password: ''
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
        console.log(this.props.history.goBack());
    }
    login = () => {
        const params = {
            userId: this.state.username,
            password: this.state.password
        };
        utils.getPromise(`http://localhost:8080/login`, params).then(json => {
            if (json) {
                console.log(json);
            }
        }, error => {
            console.error('出错了', error);
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
                <input className="password" onChange={this.inputPassword}  placeholder={'密码'} type="text" value={this.state.password}/>
                <div className="prompt">
                    <span>记住我</span>
                    <span>忘记密码</span>
                </div>
                <div className="comfirm" onClick={this.login}>登录</div>
                <div className="register">
                    <span className="tip">{`还没有账户?`}</span>
                    <span className="btn">{`注册>>`}</span>
                </div>
            </div>
        );
    }
}
