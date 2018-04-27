import React from 'react';
import './style.scss';
import classNames from 'classnames';
export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        orders:
        [
            { 'orderStatus': 'Canceled', 'orderPrice': 'CNY 46888' },
            { 'orderStatus': 'Canceled', 'orderPrice': 'CNY 46888' }
        ]
    }
    expandHeader = () => {
        this.setState(prevState => ({ showHeaderMenu: !prevState.showHeaderMenu }));
    }
    render() {
        const arrow = classNames({
            'arrow': true,
            'icon-arrow-up': this.state.showHeaderMenu,
            'icon-arrow-down': !this.state.showHeaderMenu
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
                    <div className="account">
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
                    <div className="help">
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
