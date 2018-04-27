import React from 'react';
import './style.scss';
export default class Help extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
    }
    render() {
        return (
            <div className="help">
                <div className="title">
                    FAQ
                </div>
                <div className="us">
                    <div className="left">
                        <div className="country">United States</div>
                        <div className="phone">833 896 0077</div>
                        <div className="info">24/7</div>
                    </div>
                    <div className="right">
                        电话
                    </div>
                </div>
                <div className="cn">
                    <div className="left">
                        <div className="country">China</div>
                        <div className="phone">400 828 8966</div>
                        <div className="info">24/7</div>
                    </div>
                    <div className="right">
                        电话
                    </div>
                </div>
                <div className="others">
                    <div className="left">
                        <div className="country">Other Locations</div>
                        <div className="phone">+86 21 3210 4669</div>
                        <div className="info">24/7</div>
                    </div>
                    <div className="right">
                        电话
                    </div>
                </div>
            </div>
        );
    }
}
