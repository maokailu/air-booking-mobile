import React from 'react';
import './style.scss';
import classNames from 'classnames';
import Header from 'header';
import utils from '../../resources/utils';
let params = {};
export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showHeaderMenu: false,
            params: {}
        };
    }
    componentDidMount() {
        const departCityName = utils.getUrlParam('departCityName');
        const arriveCityName = utils.getUrlParam('arriveCityName');
        // const departCityCode = utils.getUrlParam('departCityCode');
        // const arriveCityCode = utils.getUrlParam('arriveCityCode');
        const departAirportCode = utils.getUrlParam('departAirportCode');
        const arriveAirportCode = utils.getUrlParam('arriveAirportCode');
        const departAirportName = utils.getUrlParam('departAirportName');
        const arriveAirportName = utils.getUrlParam('arriveAirportName');
        const flightId = utils.getUrlParam('flightId');
        const departTime = utils.getUrlParam('departTime');
        const arriveTime = utils.getUrlParam('returnTime');
        const classType = utils.getUrlParam('classType');
        const passenger = utils.getUrlParam('passenger');
        const tripType = utils.getUrlParam('tripType');
        const ticketPrice = utils.getUrlParam('ticketPrice');
        const airportTax = utils.getUrlParam('airportTax');
        const departTimeObj = new Date(parseInt(departTime));
        const monthOfDepartTime = departTimeObj.getMonth() + 1;
        const dateOfDepartTime = departTimeObj.getDate();
        const weekOfDepartTime = departTimeObj.getDay();
        const hoursOfDepartTime = departTimeObj.getHours();
        const minutesOfDepartTime = departTimeObj.getMinutes();
        const departHMStr = `${hoursOfDepartTime}:${minutesOfDepartTime}`;
        const departTimeStr = `${monthOfDepartTime}月${dateOfDepartTime}日(周${weekOfDepartTime})`;
        const arriveTimeObj = new Date(parseInt(arriveTime));
        // const monthOfArriveTime = arriveTimeObj.getMonth() + 1;
        // const dateOfArriveTime = arriveTimeObj.getDate();
        // const weekOfArriveTime = arriveTimeObj.getDay();
        const hoursOfArriveTime = arriveTimeObj.getHours();
        const minutesOfArriveTime = arriveTimeObj.getMinutes();
        const arriveHMStr = `${hoursOfArriveTime}:${minutesOfArriveTime}`;
        // const arriveTimeStr = `${monthOfArriveTime}月${dateOfArriveTime}日(周${weekOfArriveTime})`;
        const duringHours = Math.round((parseInt(arriveTime) - parseInt(departTime)) / 1000 / 60 / 60);
        const duringMinutes = Math.round((parseInt(arriveTime) - parseInt(departTime)) / 1000 / 60 / 60);
        const duringTimeStr = duringHours + '小时' + duringMinutes + '分';
        params = {
            departHMStr: departHMStr,
            departTimeStr: departTimeStr,
            arriveHMStr: arriveHMStr,
            departAirportCode: departAirportCode,
            arriveAirportCode: arriveAirportCode,
            
            departCityName: departCityName,
            arriveCityName: arriveCityName,
            departAirportName: departAirportName,
            arriveAirportName: arriveAirportName,
            flightId: flightId,
            classType: ['头等舱', '商务舱', '经济舱'][classType],
            airportTax: airportTax,
            ticketPrice: ticketPrice,
            totalPrice: parseInt(airportTax) + parseInt(ticketPrice),
            duringTimeStr: duringTimeStr
        };
        this.setState({ params: params });
    }
    goToBook = () => {
        const query = `&departAirportCode=${utils.getUrlParam('departAirportCode')}&arriveAirportCode=${utils.getUrlParam('arriveAirportCode')}`
            + `&departAirportName=${utils.getUrlParam('departAirportName')}&arriveAirportName=${utils.getUrlParam('arriveAirportName')}`
            + `&departTimeStr=${params.departTimeStr}&departHMStr=${params.departHMStr}`
            + `&arriveHMStr=${params.arriveHMStr}&totalPrice=${params.totalPrice}`
            + `&flightId=${params.flightId}&cabinClassId=${utils.getUrlParam('classType')}`;

        const path = {
            pathname: `/book`,
            search: query
        };
        this.props.history.push(path);
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
                    <span className="depart-text">出发</span>
                    <span className="title-text">{this.state.params.flightId}</span>
                    <span className="title-text">{this.state.params.classType}</span>
                    <span className="title-text">{this.state.params.departTimeStr}</span>
                    <span className="title-text">{this.state.params.duringTimeStr}</span>
                    <div className="flight-list">
                        <div className="time">
                            <span>{this.state.params.departHMStr}</span>
                            <span>{this.state.params.arriveHMStr}</span>
                        </div>
                        <div className="airport">
                            <span>{this.state.params.departAirportCode}</span>
                            <span>{this.state.params.arriveAirportCode}</span>
                        </div>
                        <div className="city-name">
                            <span>{this.state.params.departCityName + ' ' + this.state.params.departAirportName}</span>
                            <span>{this.state.params.arriveCityName + ' ' + this.state.params.arriveAirportName}</span>
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
                    <div className="price-row style2">
                        <span>成人</span>
                        <span className="right">{'人民币 ' + this.state.params.totalPrice}</span>
                    </div>
                    <div className="price-row style1">
                        <span>票价</span>
                        <span className="right">{'人民币 ' + this.state.params.ticketPrice}</span>
                    </div>
                    <div className="price-row style1">
                        <span>{'税&服务费'}</span>
                        <span className="right">{'人民币 ' + this.state.params.airportTax}</span>
                    </div>
                    <div className="price-row border style2">
                        <span>总价</span>
                        <span className="right">{'人民币 ' + this.state.params.totalPrice}</span>
                    </div>
                    <div className="btn" onClick={this.goToBook}>确认</div>
                </div>
                <div className="footer">
                    <i className="flight-logo" />
                    <div className="member">祝你一路顺风！</div>
                </div>
            </div>
        );
    }
}
