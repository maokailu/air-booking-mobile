import React from 'react';
import './style.scss';
import Header from 'header';
export default class Help extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
    }
    render() {
        return (
            <div>
                <Header />
                <div className="help">
                    <div className="title">
                        常见问题
                    </div>
                    <div className="us">
                        <div className="left">
                            <div className="country">美国</div>
                            <div className="phone">833 896 0077</div>
                            <div className="help-info">24/7</div>
                        </div>
                        <div className="right">
                            电话
                        </div>
                    </div>
                    <div className="cn">
                        <div className="left">
                            <div className="country">中国</div>
                            <div className="phone">400 828 8966</div>
                            <div className="help-info">24/7</div>
                        </div>
                        <div className="right">
                            电话
                        </div>
                    </div>
                    <div className="others">
                        <div className="left">
                            <div className="country">其他地区</div>
                            <div className="phone">+86 21 3210 4669</div>
                            <div className="help-info">24/7</div>
                        </div>
                        <div className="right">
                            电话
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
