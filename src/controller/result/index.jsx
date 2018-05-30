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
                <div className="text">2.本公司通过网上预定的机票都是使用电子机票.请在24小时内付款.超过24小时未付款，则本改预订的机票将被取消，不再预留座位.</div>
                <div className="text">3.24小时内可免费取消订单.</div>
                <div className="text">4.退票规则需要根据航司规定.</div>
            </div>
        );
    }
}

export default Result
;
