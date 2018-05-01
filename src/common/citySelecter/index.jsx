import React from 'react';
import './style.scss';
export default class CitySelecter extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    render() {
        return (
            <div className="city-selecter" onClick = {() => this.props.closeCitySelecter()}>
                <div className="title">
                    <span className="close-btn">arrow</span>
                    <span className="input-label">出发城市</span>
                    <span className="input-box">城市或機場</span>
                </div>
                <div className="recent-city">
                    <span className="label">最近搜寻</span>
                </div>
                <div className="hot-city">热门城市</div>
                <div className="recent-city">
                    <span className="label">日韩</span>
                </div>
                <div className="recent-city">
                    <span className="label">东南亚</span>
                </div>
            </div>
        );
    }
}
