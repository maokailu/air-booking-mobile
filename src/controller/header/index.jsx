import React from 'react';
import './style.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { getUrlParam, getCookie } from '../../resources/utils';
import date from '../../resources/date';
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders:
            [
                { 'orderStatus': 'Canceled', 'orderPrice': 'CNY 46888' },
                { 'orderStatus': 'Canceled', 'orderPrice': 'CNY 46888' }
            ],
            checked: false,
            userName: ''
        };
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    componentDidMount() {
        if (document.cookie.indexOf('userId') !== -1) {
            this.setState({
                checked: true,
                userName: getCookie('userId')
            });
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
    clickOrders = () =>{
        const path = {
            pathname: `/orders`
        };
        this.context.router.history.push(path);
    }
    goHome = () => {
        this.context.router.history.push('/home');
    }
    clickLoginOut = () =>{
        const exp = new Date();
        exp.setTime(exp.getTime() - 1);
        const name = 'userId';
        var cval = getCookie(name);
        if (cval !== null)  document.cookie = name + '=;expires=' + exp.toGMTString();
        const path = {
            pathname: `/login`
        };
        this.context.router.history.push(path);
    }
    render() {
        const arrow = classNames({
            'arrow': true,
            'icon-up-arrow': this.state.showHeaderMenu,
            'icon-down-arrow': !this.state.showHeaderMenu
        });
        // console.log(getUrlParam('flightType'));
        return (
            <div className = "header">
                <div className={'head' + (this.props.isHome ? ' white-back' : ' blue-back')}
                    onClick={this.expandHeader}>
                    <i className={(this.props.isHome ? 'white-logo' : 'blue-logo')}
                        style={this.props.isList ? { transform: 'translateY(-13px)' } : {}} ></i>

                    {/* <i className={'logo-text' + (this.props.isHome ? ' blue' : ' white')}>机票预定</i> */}
                    <i className={arrow} style={this.props.isHome ? { color: '' } : { color: '#fff' }}>
                    </i>
                    {/* style={this.props.isList ? { transform: 'translateY(-25px)' } : {}} */}
                    {
                        (this.props.isList || this.props.isBook) && <div className="book-title">
                            <span>{getUrlParam('departCityCodeSearch')}</span>
                            <span className={(parseInt(getUrlParam('flightType')) === 0) ?
                                'icon-arrow-two-way' : 'icon-arrow-one-way'}></span>
                            <span>{getUrlParam('arriveCityCodeSearch')}</span><br/>
                            {this.props.isList && <span >
                                <span>{date.format(new Date(parseInt(getUrlParam('departTimeSearch'))),
                                    'yyyy-MM-dd')}</span>
                                {' -'}
                                <span>{date.format(new Date(parseInt(getUrlParam('returnTimeSearch'))),
                                    'yyyy-MM-dd')}
                                </span>
                                <span>{['头等舱', '商务舱', '经济舱'][parseInt(getUrlParam('classType'))]}</span>
                                <span>{getUrlParam('passenger')}人</span></span>}
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
                        <span className="right">{this.state.userName}</span>
                    </div>
                    <div className="bookings" onClick={this.clickOrders}>
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
