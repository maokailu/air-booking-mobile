import React from 'react';
import './style.scss';
import Header from 'header';
import Footer from 'footer';
export default class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
    }
    render() {
        return (
            <div>
                <Header />
                <div className="account-box">
                    <div className="account">
                        <div className="title">
                            <i className="icon-account-circle portrait"></i>
                            <span className="username">毛凯露</span>
                        </div>
                        <div className="profile">
                            <div className="promo-code"><span>促销代码：</span>4</div>
                            <div className="points"><span>积分：</span>10000000</div>
                            <div className="c-money"><span>账户余额:</span>300.98</div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
