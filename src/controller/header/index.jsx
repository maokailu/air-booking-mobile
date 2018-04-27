import React from 'react';
import './style.scss';
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
    render() {
        return (
            <div className="header">
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
            </div>
        );
    }
}
