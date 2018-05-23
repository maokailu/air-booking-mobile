import React from 'react';
import './style.scss';
import utils from '../../../resources/utils';
import Header from 'header';
import Footer from 'footer';
// let param = {};
// let logoPic = ['hu', 'mf', 'ca', 'ho', 'mu'];
export default class Orders extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        orders: null,
        test: null,
        departCityCode: localStorage.getItem('departCityCode') || 'SHA'
    }
    componentDidMount() {
        let userId = utils.getCookie('userId');
        if (userId) {
            userId = utils.getCookie('userId');
            utils.getPromise(`http://localhost:8080/getOrdersByUserId?userId=${userId}`).then(json => {
                this.setState({
                    orders: json
                });
            }, error => {
                console.error('出错了', error);
            });
        } else {
            // // 跳转登陆框
            // const path = {
            //     pathname: `/login`
            // };
            // this.props.history.push(path);
        }
    }
    // goToDetail = order => {
    // console.log(order);
    // const query = `departCityName=
    // ${utils.getUrlParam('departCityName')}&arriveCityName=${utils.getUrlParam('arriveCityName')}`
    //     + `&departCityCode=
    // ${utils.getUrlParam('departCityCode')}&arriveCityCode=${utils.getUrlParam('arriveCityCode')}`
    //     + `&departAirportCode=${flight.departAirportCode}&arriveAirportCode=${flight.arriveAirportCode}`
    //     + `&departAirportName=${flight.departAirportName}&arriveAirportName=${flight.arriveAirportName}`
    //     + `&departTime=${flight.departTime}&returnTime=${flight.returnTime}`
    //     + `&passenger=${utils.getUrlParam('passenger')}&flightId=${flight.flightId}`
    //     + `&tripType=${flight.flightType}&classType=${utils.getUrlParam('classType')}`
    //     + `&airportTax=${flight.airportTax}`
    //     + `&ticketPrice=${flight.ticketPrice}`;
    // const path = {
    //     pathname: `/detail`,
    //     search: query
    // };
    // this.props.history.push(path);
    // }
    render() {
        return (
            <div>
                <Header/>
                <div className="order-list">
                    {this.state.orders && this.state.orders.map((order, index) =>
                        <div key={index} className="item"  onClick={()=>this.goToDetail(order)}>
                            {/* <div className="row1">
                                <img className="logo" src={`http://pic.english.c-ctrip.com/airline_logo/32/${logoPic
                                [Math.round(index + 1 / 3)]}.png`}/>
                                <span className="airline">{['海南航空', '厦门航空', '中国国航', '东方航空', '吉祥航空']
                                [(Math.round(index + 1 / 3))]}</span>
                            </div> */}
                            <div className="row2">
                                <div className="left">
                                    <div className="column1">
                                        <div>
                                            <div className="" style={{ color: 'rgb(32, 194, 145)',
                                                display: 'inline-block' }}>
                                                {'航班号：' + order.flight.flightId}</div>
                                            <div className=""
                                                style={{ color: 'rgb(32, 194, 145)' }}>{'订单状态：已完成'}</div>
                                            <div className=""
                                                style={{ color: 'rgb(32, 194, 145)' }}>
                                                {'舱位类型：' + order.cabinClass.cabinClassName}</div>

                                        </div>
                                        {/* <div className="time">{(new Date(order.flight.departTime)).getHours()
                                         + ':' + (new Date(order.flight.departTime)).getMinutes()}</div>
                                    <div className="time">{(new Date(order.flight.departTime)).getHours()
                                    + ':' + (new Date(order.flight.departTime)).getMinutes()}</div> */}

                                        <div className="loc">
                                            {order.flight.departCityName + order.flight.departAirportName}</div>
                                    </div>
                                    <span className="arrow"></span>
                                    <div className="column2">
                                        {/* <div className="time">
                                        {(new Date(order.flight.returnTime)).getHours() + ':'
                                        + (new Date(order.flight.returnTime)).getMinutes()}</div>
                                    <div className="time">
                                {(new Date(order.flight.returnTime)).getHours() + ':'
                            + (new Date(order.flight.returnTime)).getMinutes()}</div> */}

                                        <div className="loc">
                                            {order.flight.arriveCityName  + order.flight.arriveAirportName}</div>
                                    </div>
                                </div>
                                {/* 总价 */}
                                {/* <span className="price">{'人民币 ' +
                            (parseInt(order.airportTax) + parseInt(order.ticketPrice)) + '元'}</span> */}
                                <span className="price"
                                    style={{ transform: 'translateY(10px)' }}>{order.passenger.name}</span>

                            </div>
                            <div className="row3">
                                {/* { Math.round(((parseInt(order.flight.returnTime
                                - order.flight.departTime)) / 1000 / 60 / 60)) + '小时'}
                                { Math.round(((parseInt(order.flight.returnTime
                                - order.flight.departTime)) / 1000 / 60 % 60)) + '分'} */}
                                <div className="time" style={{ display: 'inline-block',
                                    marginRight: '10px' }}>
                                    {(new Date(order.flight.departTime)).getFullYear() + '年' +
                                    ((new Date(order.flight.departTime)).getMonth() + 1) + '月'
                                    + (new Date(order.flight.departTime)).getDate() + '日，'}</div>
                                <div className="time" style={{ display: 'inline-block' }}>
                                    {(new Date(order.flight.departTime)).getHours() + ':'
                                    + (new Date(order.flight.departTime)).getMinutes()}</div>
                                <span style={{ margin: '0 5px' }}>-</span>
                                <div className="time" style={{ display: 'inline-block' }}>
                                    {(new Date(order.flight.returnTime)).getHours() + ':'
                                    + (new Date(order.flight.returnTime)).getMinutes()}</div>

                            </div>
                        </div>
                    )}
                </div>
                <Footer style={{ backgroundColor: '#EFEFF4' }}/>
            </div>
        );
    }
}
