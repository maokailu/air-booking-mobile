import React from 'react';
import './style.scss';
export default class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
    }
    render() {
        return (
            <div className="account">
                <div className="title">
                    <i className="portrait-icon">头像</i>
                    <span className="username">Kayla/Mau</span>
                </div>
                <div className="profile">
                    <div className="promo-code"><span>Promo Codes:</span>4</div>
                    <div className="points"><span>Points:</span>10000000</div>
                    <div className="c-money"><span>C-M oney:</span>300.98</div>
                </div>
            </div>
        );
    }
}
