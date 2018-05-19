import React from 'react';
import './style.scss';
import utils from '../../resources/utils';
import Footer from 'footer';
export default class Book extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        passengers: []
    }
    componentDidMount() {
        utils.getPromise('http://localhost:8080/getPassengers').then(json => {
            this.setState({
                passengers: json
            });
        }, error => {
            console.error('出错了', error);
        });
    }
    createOrder = () => {
        const order = {
            orderId: 0,
            userId: 2,
            contactName: '毛凯露',
            orderDate: new Date(),
            orderState: 0,
            totalTicketPrice: 0,
            totalFuelSurcharge: 0,
            totalAirportTax: 0,
            totalPrice: 0,
            cellphone: 0,
            email: 0,
            zipCode: 0
        };
        const orderItem = {
            orderItemId: 2,
            orderId: 0,
            ticketId: 0,
            seatRequire: 0
        };
        const ticket = {
            ticketId: 1,
            flightId: 0,
            cabinClassId: 0
        };
        const passengers = [{ passengerId: 0 }, { passengerId: 2 }];
        const params = {
            order: order,
            orderItem: orderItem,
            ticket: ticket,
            passengers: passengers
        };
        utils.getPromise('http://localhost:8080/createOrder', params).then(json => {
            console.log(json);
            json = JSON.parse(json);
            this.goToPay(json);
        }, error => {
            console.error('出错了', error);
        });
        this.goToPay();
    }
    goToPay = json => {
        const passenger = this.state.passengers[0];
        const path = {
            pathname: '/result',
            query: {
                passenger: passenger,
                resultInfo: json
            }
        };
        // this.createOrder();
        this.props.history.push(path);
    }
    render() {
        return (
            <div className="book">
                <div className="person-title">选择/新增乘客</div>
                <div className="person-list">
                    {this.state.passengers.map((passenger, index) =>
                        <div className="person" key={index}>
                            <div className="name">{passenger.name}</div>
                            <div className="card">{'zfb 港澳通行证'}</div>
                        </div>
                    )}
                    <div className="more">更多...</div>
                </div>
                <div className="passenger-list">
                    旅客1 成人
                </div>
                <div className="add-passenger-btn">
                +乘客
                </div>
                <div className="contact-person-txt"> 联络人信息</div>
                <div className="txt">若您預訂的行程有任何問題，Trip.com 會主動聯絡您。</div>
                <div className="contact-person-form" onChange={this.getInputContent}>
                    <div contentEditable="true">1</div>
                    <div contentEditable="true">2</div>
                    <div contentEditable="true">3</div>
                </div>
                <div className="service-phone">
                    目前手機版網頁僅支持預訂成人票。如需預訂小童或嬰兒票，請致電852 3069 9966 886 2 7703 9088 +86 21 2226 8881
                </div>
                <div className="blue">
                中國國際航空對行李之相關規定
                </div>
                <div className="blue">
                中國國際航空對限制物品之相關規定
                </div>
                <div className="tit">條款及細則
                </div>
                <div className="prompt">按下＂付款＂以確認同意
                </div>
                <div className="price">
                    <div className="tit">总价</div>
                    <div><span className="money-type">人名币</span><span className="number">6666</span></div>
                </div>
                <div className="comfirm-btn" onClick={this.createOrder}>确认</div>
                <div className="secured">secured</div>
                <Footer />
            </div>
        );
    }
}
