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
                    <i className="line"/>
                    <span className="policy">Privacy Policy
                    </span>
                </div>
                <div className="copyright">
                    {
                        `设计与开发@毛凯露`
                    }
                </div>
            </div>
        );
    }
}
