import React from 'react';
import './style.scss';
import { getUrlParam, fetchData } from '../../../resources/utils';
import Footer from 'footer';
export default class Orders extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        order: {}
    }
    componentDidMount() {
        const orderId = getUrlParam('orderId');
        this.getOrderDetail(orderId);
    }
    getOrderDetail = orderId => {
        fetchData(`getOrderByOrderId?orderId=${orderId}`).then(json => {
            this.setState({
                order: json
            });
        }, error => {
            console.error('出错了', error);
        });
    }
    calculateDepartTime = departTime =>{
        const departTimeObj1 = new Date(parseInt(departTime));
        const monthOfDepartTime1 = departTimeObj1.getMonth() + 1;
        const dateOfDepartTime1 = departTimeObj1.getDate();
        const weekOfDepartTime1 = departTimeObj1.getDay();
        const departTimeStr1 = `${monthOfDepartTime1}月${dateOfDepartTime1}日(周${weekOfDepartTime1})`;
        return departTimeStr1;
    }
    calculateDuringTime = flight =>{
        const departTime2 = flight.departTime;
        const arriveTime2 = flight.returnTime;
        const duringHours2 = Math.round((parseInt(arriveTime2) - parseInt(departTime2)) / 1000 / 60 / 60);
        const duringMinutes2 = Math.round((parseInt(arriveTime2) - parseInt(departTime2)) / 1000 / 60 / 60);
        const duringTimeStr2 = duringHours2 + '小时' + duringMinutes2 + '分';
        return duringTimeStr2;
    }
    calculateHMStr = departTime =>{
        const departTimeObj1 = new Date(parseInt(departTime));
        const hoursOfDepartTime1 = departTimeObj1.getHours();
        const minutesOfDepartTime1 = departTimeObj1.getMinutes();
        const departHMStr1 = `${hoursOfDepartTime1}:${minutesOfDepartTime1}`;
        return departHMStr1;
    }
    changeState = orderState =>{
        if (orderState === 1) {
            // 取消订单
            fetchData(`cancelOrderByOrderId?orderId=${this.state.order.orderId}`).then(() => {
                const order = this.state.order;
                order.orderState = 0;
                this.setState({
                    order: order
                });
            }, error => {
                console.error('出错了', error);
                // 弹出浮层，提示取消失败，请联系客服
            });
        } else {
            // 再次预定，返回首页
            this.props.history.push('/home');
        }
    }
    goToHome = () =>{
        this.props.history.push('/home');
    }
    closeOrderDetail = () =>{
        this.props.history.goBack();
    }
    render() {
        return (
            <div>
                <div className="order-detail">
                    <div className="section1">
                        <div className="order-detail-title">
                            <span onClick={this.closeOrderDetail}>关闭</span>
                            <span>订单号： {getUrlParam('orderId')}</span>
                            <span onClick={this.goToHome} className="icon-home"/>
                        </div>
                        <div className="state-and-price">
                            <span className="state">{this.state.order.orderState === 1 ? '已完成' : '已取消'}</span>
                            <span className="price">{this.state.order.totalPrice}元</span>
                        </div>
                        <div className="change-state" onClick={()=>this.changeState(this.state.order.orderState)}>
                            {this.state.order.orderState === 1 ? '取消订单' : '再次预定'}</div>
                    </div>
                    {this.state.order && this.state.order.orderItems &&
                    this.state.order.orderItems.map((orderItem, index, arr) =>
                        <div key={index}>
                            {(index === 0 || index === arr.length - 1) && <div className="flight-item">
                                <span className="depart-text"> {index === 0 ? '出发' : '回程' } </span>
                                <span className="title-text">
                                    {this.calculateDepartTime(orderItem.ticket.flight.departTime)}</span>
                                <span className="title-text">{this.calculateDuringTime(orderItem.ticket.flight)}</span>
                                <div className="flight-main">
                                    <div className="time">
                                        <span>{this.calculateHMStr(orderItem.ticket.flight.departTime)}</span>
                                        <span>{this.calculateHMStr(orderItem.ticket.flight.returnTime)}</span>
                                    </div>
                                    <div className="airport">
                                        <span>{orderItem.ticket.flight.departAirportCode}</span>
                                        <span>{orderItem.ticket.flight.arriveAirportCode}</span>
                                    </div>
                                    <div className="city-name">
                                        <span>{orderItem.ticket.flight.departAirportName}</span>
                                        <span>{orderItem.ticket.flight.arriveAirportName}</span>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    )}
                    <div className="passenger-title"> 乘客资料 </div>
                    {this.state.order && this.state.order.orderItems &&
                    this.state.order.orderItems.map((orderItem, index, arr) =>
                        <div key={index}>
                            {(index >= 0 && index <= arr.length / 2 - 1) && <div className="passengers-item">
                                <div className="passenger-name">{orderItem.passenger.name}</div>
                                <div className="passenger-card-num">身份证 {orderItem.passenger.cardNumber}</div>
                            </div>}
                        </div>
                    )}
                    <div className="contact-info">
                        <span className="tit">{'联络资料'}</span>
                        <div className="main">
                            <span>{this.state.order.contactName}</span>
                            <span>{this.state.order.cellphone}</span>
                            <span>{this.state.order.email}</span>
                        </div>
                    </div>
                </div>
                <Footer style={{ backgroundColor: '#EFEFF4' }}/>
            </div>
        );
    }
}
