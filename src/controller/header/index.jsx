import React from 'react';
import './style.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import utils from '../../resources/utils.js';
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders:
            [
                { 'orderStatus': 'Canceled', 'orderPrice': 'CNY 46888' },
                { 'orderStatus': 'Canceled', 'orderPrice': 'CNY 46888' }
            ],
            checked: false
        };
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    componentDidMount(){
        if(document.cookie.indexOf('userId') !== -1){
            this.setState({
                checked: true
            })
        }
    }
    expandHeader = () => {
        this.setState(prevState => ({ showHeaderMenu: !prevState.showHeaderMenu }));
    }
    clickAccount = () =>{
        this.context.router.history.push('/account');
    }
    clickHelp = () =>{
        const path = {
            pathname: `/help`
        };
        this.context.router.history.push(path);
    }
    clickOrder = () =>{
        const path = {
            pathname: `/order`
        };
        this.props.history.push(path);
    }
    goHome = () => {
        location.href = 'http://localhost:8082/';
    }
    clickLoginOut = () =>{
        const exp = new Date();
        exp.setTime(exp.getTime() - 1);
        const name = 'userId';
        var cval=utils.getCookie(name);
        if(cval!=null)  document.cookie= name + "=;expires="+exp.toGMTString();
        location.href = 'http://localhost:8082/login';
    }
    render() {
        const arrow = classNames({
            'arrow': true,
            'icon-up-arrow': this.state.showHeaderMenu,
            'icon-down-arrow': !this.state.showHeaderMenu
        });
        return (
            <div className = "header">
                <div className={'head' + (this.props.isHome ? ' white-back' : ' blue-back')}
                    onClick={this.expandHeader}>
                    {/* <i className="logo"></i> */}
                    <i className={'logo-text' + (this.props.isHome ? ' blue' : ' white')}>机票预定</i>
                    <i className={arrow}>
                    </i>
                    {
                        this.props.isBook && <div className="book-title">
                            <span>{this.props.params && this.props.params.departAirportName}</span>
                            <span>到</span>
                            <span>{this.props.params && this.props.params.arriveAirportName}</span>
                        </div>
                    }
                </div>
                {this.state.showHeaderMenu && <div className="main">
                    <div className="home" onClick={this.goHome}>
                        <span className="left">首页</span>
                        {/* <span className="right">Home</span> */}
                    </div>
                    <div className="account" onClick={this.clickAccount}>
                        <span className="left">账户</span>
                        <span className="right">毛凯露</span>
                    </div>
                    <div className="bookings">
                        <span className="left">我的订单</span>
                    </div>
                    <div className="language">
                        <span className="left">语言</span>
                        <span className="right">中文</span>
                    </div>
                    <div className="currency">
                        <span className="left">货币</span>
                        <span className="right">人民币</span>
                    </div>
                    <div className="help" onClick={this.clickHelp}>
                        <span className="left">帮助</span>
                    </div>
                    <div className="sign-out" onClick={this.clickLoginOut}>
                        <span className="left">{this.state.checked ? '登出' : '登入'}</span>
                    </div>
                </div>}
            </div>
        );
    }
}
