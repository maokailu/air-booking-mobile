import React from 'react';
import './style.scss';
import Header from 'header';
import utils from '../../resources/utils';
class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultInfo: utils.getUrlParam('resultInfo')
        };
    }
    componentDidMount() {
        utils.getUrlParam('resultInfo');
        console.log(this.state.resultInfo);
    }
    render() {
        return (
            <div className="result">
                <Header />
                <div className="result-tip">{this.state.resultInfo}</div>
                <div className="text">注意事项：</div>
                <div className="text">
                1.无论纸票SE是电子客票，旅客必须在航空公司规定的时阳内到选机场，
                凭客票及本人有效身份证件按时办理值机手续。飞机起飞前45分钟左右停止办理值机手续，特别提醍，为保证登机顺利请提前90分钟到达机场办理值机、登机手续。</div>
                <div className="text">2.本公司通过网上雨订的杭票都是使闻电子机票.请在24小时内村清相关款通.超过24小时未付款，则本改预订的机票将被联濟，不苒顸留座位.</div>
            </div>
        );
    }
}

export default Result
;
