import React from 'react';
import './style.scss';
import { getCookie, fetchData } from '../../../resources/utils';
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
        let userId = getCookie('userId');
        const params = {
            user: {
                userId: userId
            }
        };
        if (userId) {
            userId = getCookie('userId');
            fetchData(`getOrders`, params).then(json => {
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
    goToDetail = orderId => {
        const query = `orderId=${orderId}`;
        const path = {
            pathname: `/order-detail`,
            search: query
        };
        this.props.history.push(path);
    }
    render() {
        return (
            // 取的每个主订单的第一张子订单信息 由于插入时先插入去程航班 所以取得的是去程航班信息 算了 不取航班
            <div>
                <Header/>
                <div className="order-list">
                    {this.state.orders && this.state.orders.map((order, index) =>
                        <div key={index} className="item"
                            style= {order.orderState !== 1 ? { color: '#ccc' } : {} }
                            onClick={()=>this.goToDetail(order.orderId)}>
                            <div style={{     display: 'flex' }}>
                                <div className="row2">
                                    <div className="left">
                                        <div className="column1">
                                            <div>
                                                <i className="icon-flight" />
                                                <span className="order-state" style={order.orderState === 1  ?
                                                    { color: '#1899F2' } : {}}>{(order.orderState === 1 ?
                                                        '已完成' : '已取消')}</span>
                                            </div>
                                            <img className="logo" style={ order.orderState === 1 ? {} :
                                                { filter: 'grayscale(100%)' }}
                                            src={``}/>
                                            <div className="" style={{ color: '',
                                                display: 'inline-block' }}>
                                                {order.orderItems[0].ticket.flight.flightId}</div>
                                            <div className=""
                                                style={{ color: '' }}>
                                                {order.orderItems[0].ticket.cabinClass.cabinClassName}</div>
                                            {/* <div className="time">{(new Date(order.flight.departTime)).getHours()
                                         + ':' + (new Date(order.flight.departTime)).getMinutes()}</div>
                                    <div className="time">{(new Date(order.flight.departTime)).getHours()
                                    + ':' + (new Date(order.flight.departTime)).getMinutes()}</div> */}

                                            {/* <div style={{ textAlign: 'center' }}> */}

                                            {/* </div> */}
                                        </div>
                                        {/* <span className="icon-arrow-thin-right"></span> */}
                                        <div>
                                            <span className="loc">
                                                {order.orderItems[0].ticket.flight.departCityName}</span>
                                            <span className="icon-long-arrow-right"></span>
                                            <span className="loc">
                                                {order.orderItems[0].ticket.flight.arriveCityName}</span>
                                        </div>
                                        {/* <div className="column2"> */}
                                        {/* <div className="time">
                                        {(new Date(order.flight.returnTime)).getHours() + ':'
                                        + (new Date(order.flight.returnTime)).getMinutes()}</div>
                                    <div className="time">
                                {(new Date(order.flight.returnTime)).getHours() + ':'
                            + (new Date(order.flight.returnTime)).getMinutes()}</div> */}
                                        {/* <div style={{ textAlign: 'center' }}> */}

                                        {/* </div> */}
                                        {/* </div> */}
                                    </div>
                                    {/* 总价 */}
                                    {/* <span className="price">{'人民币 ' +
                            (parseInt(order.airportTax) + parseInt(order.ticketPrice)) + '元'}</span> */}

                                </div>
                                <div className="column2">
                                    <div className="row3">
                                        {/* { Math.round(((parseInt(order.flight.returnTime
                                - order.flight.departTime)) / 1000 / 60 / 60)) + '小时'}
                                { Math.round(((parseInt(order.flight.returnTime
                                - order.flight.departTime)) / 1000 / 60 % 60)) + '分'} */}
                                        <div className="time" style={{ display: 'inline-block',
                                            marginRight: '10px' }}>
                                            {(new Date(order.orderItems[0].ticket.flight.departTime)).getFullYear() +
                                            '年' +
                                    ((new Date(order.orderItems[0].ticket.flight.departTime)).getMonth() + 1) + '月'
                                    + (new Date(order.orderItems[0].ticket.flight.departTime)).getDate() + '日'}</div>
                                    </div>
                                    <span className="time" style={{ display: 'inline-block', marginRight: '10px' }}>
                                        {(new Date(order.orderItems[0].ticket.flight.departTime)).getHours() + ':'
                                    + (new Date(order.orderItems[0].ticket.flight.departTime)).getMinutes()}</span>
                                    <span className="loc">{order.orderItems[0].ticket.flight.departAirportName}</span>
                                    <br/>
                                    <span className="time" style={{ display: 'inline-block', marginRight: '10px' }}>
                                        {(new Date(order.orderItems[0].ticket.flight.returnTime)).getHours() + ':'
                                    + (new Date(order.orderItems[0].ticket.flight.returnTime)).getMinutes()}</span>
                                    <span className="loc">{order.orderItems[0].ticket.flight.arriveAirportName}</span>
                                </div>
                            </div>
                            <span className={'price'}
                                style={order.orderState === 1 ? { transform: 'translateY(10px)' } :
                                    { color: '#ccc', transform: 'translateY(10px)' }}>{order.totalPrice || 0}元</span>

                        </div>
                    )}
                </div>
                <Footer style={{ backgroundColor: '#EFEFF4' }}/>
            </div>
        );
    }
}
