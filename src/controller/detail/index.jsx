import React from 'react';
import './style.scss';
import classNames from 'classnames';
import Header from 'header';
export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showHeaderMenu: false
        };
    }
    componentDidMount() {
        console.log(localStorage.getItem('flightsId'));
    }
    goToBook = () => {
        this.props.history.push('./book');
    }
    render() {
        classNames({});
        return (
            <div>
                <Header />
                <div className="info">
                    <i className="" />
                    已选航班！
                </div>
                <div className="box">
                    <div className="depart-text">出发</div>
                    <div className="flight-list">
                        <div className="time">
                            <span>13:20</span>
                            <span>13:20</span>
                        </div>
                        <div className="city">
                            <span>HKG</span>
                            <span>HKG</span>
                        </div>
                    </div>
                </div>
                <div className="box">
                    <div className="row1">
                        <span className="policy">提示</span>
                        {/* <span className="details">详情</span> */}
                    </div>
                    <div className="row2">
                        <i className="icon" />推荐航班
                    </div>
                    <ul className="row3">
                        <li>行李政策由航空公司规定</li>
                        <li>退票费用50元起</li>
                    </ul>
                </div>
                <div className="box">
                    <span>还没决定好？</span>
                    <div className="change-flight">更改航班</div>
                    <span className="remind">请注意，票价随时可能变动</span>
                </div>
                {/* <div className="insurance">
                    <span className="tit">保护您的航班</span>
                    <span className="status">为何不保护您的航班？</span>
                </div> */}
                {/* <div className="box insurance-box">
                    <i className="insurance-logo" />
                    <div>
                        <span className="column1">飞行事故伤害保险测试</span>
                        <span className="column2">飞行事故伤害保险测试</span>
                        <span className="column3">飞行事故伤害保险测试</span>
                        <span className="column4">飞行事故伤害保险测试</span>
                        <i className="icon-check" />
                    </div>
                </div> */}
                <div className="box">
                    <div className="row">
                        <span>成人</span>
                        <span className="right">CNY</span>
                    </div>
                    <div className="row">
                        <span>票价</span>
                        <span className="right">CNY</span>
                    </div>
                    <div className="row">
                        <span>{'税&&服务费'}</span>
                        <span className="right">CNY</span>
                    </div>
                    <div className="row border">
                        <span>总结</span>
                        <span className="right">CNY</span>
                    </div>
                    <div className="btn" onClick={this.goToBook}>Comfirm</div>
                </div>
                <div className="footer">
                    <i className="flight-logo" />
                    <div className="member">祝你一路顺风！</div>
                </div>
            </div>
        );
    }
}
