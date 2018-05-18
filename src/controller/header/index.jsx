import React from 'react';
import './style.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders:
            [
                { 'orderStatus': 'Canceled', 'orderPrice': 'CNY 46888' },
                { 'orderStatus': 'Canceled', 'orderPrice': 'CNY 46888' }
            ]
        };
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
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
    render() {
        const arrow = classNames({
            'arrow': true,
            'icon-up-arrow': this.state.showHeaderMenu,
            'icon-down-arrow': !this.state.showHeaderMenu
        });
        return (
            <div className="header">
                <div className="head"
                    onClick={this.expandHeader}>
                    <i className="logo"></i>
                    <i className={arrow}>
                    </i>
                </div>
                {this.state.showHeaderMenu && <div className="main">
                    <div className="home">
                        <span className="left">Home</span>
                        <span className="right">Home</span>
                    </div>
                    <div className="account" onClick={this.clickAccount}>
                        <span className="left">Accounts</span>
                        <span className="right">Linda/LaLaLa</span>
                    </div>
                    <div className="bookings">
                        <span className="left">My Bookings</span>
                    </div>
                    <div className="language">
                        <span className="left">Language</span>
                        <span className="right">English (United States)</span>
                    </div>
                    <div className="currency">
                        <span className="left">Currency</span>
                        <span className="right">DNY</span>
                    </div>
                    <div className="help" onClick={this.clickHelp}>
                        <span className="left">Help</span>
                    </div>
                    <div className="sign-out">
                        <span className="left">Sign out</span>
                    </div>
                </div>}
            </div>
        );
    }
}
