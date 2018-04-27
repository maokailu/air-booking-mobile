import React from 'react';
import './style.scss';
export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
    }
    render() {
        return (
            <div className="footer-box">
                <div className="footer-item">
                    <span className="about">About us
                    </span>
                    <span className="policy">Privacy Policy
                    </span>
                </div>
                <div className="copyright">Copyright © 1999-2018 Trip.com. All rights reserved<br/>ICP证：沪B2-20050130</div>
            </div>
        );
    }
}
