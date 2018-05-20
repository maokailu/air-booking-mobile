import React from 'react';
import './style.scss';
import utils from '../../resources/utils';
import Footer from 'footer';
import Header from 'header';
let params = {};
export default class Book extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        passengers: [],
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        showMaxNameTip: false,
        showMaxPhoneTip: false,
        showMaxEmailTip: false,
        showNamePassTip: false
    }
    componentDidMount() {
        utils.getPromise('http://localhost:8080/getPassengers').then(json => {
            this.setState({
                passengers: json
            });
        }, error => {
            console.error('出错了', error);
        });
        const departAirportName = utils.getUrlParam('departAirportName');
        const arriveAirportName = utils.getUrlParam('arriveAirportName');
        const departAirportCode = utils.getUrlParam('departAirportCode');
        const arriveAirportCode = utils.getUrlParam('arriveAirportCode');
        const departTimeStr = utils.getUrlParam('departTimeStr');
        const departHMStr = utils.getUrlParam('departHMStr');
        const arriveHMStr = utils.getUrlParam('arriveHMStr');
        params = {
            departAirportCode: departAirportCode,
            arriveAirportCode: arriveAirportCode,
            departAirportName: departAirportName,
            arriveAirportName: arriveAirportName,
            departTimeStr: departTimeStr,
            departHMStr: departHMStr,
            arriveHMStr: arriveHMStr
        };
        console.log(params);
    }
    // createOrder = () => {
    //     const order = {
    //         orderId: 0,
    //         userId: 2,
    //         contactName: '毛凯露',
    //         orderDate: new Date(),
    //         orderState: 0,
    //         totalTicketPrice: 0,
    //         totalFuelSurcharge: 0,
    //         totalAirportTax: 0,
    //         totalPrice: 0,
    //         cellphone: 0,
    //         email: 0,
    //         zipCode: 0
    //     };
    //     const orderItem = {
    //         orderItemId: 2,
    //         orderId: 0,
    //         ticketId: 0,
    //         seatRequire: 0
    //     };
    //     const ticket = {
    //         ticketId: 1,
    //         flightId: 0,
    //         cabinClassId: 0
    //     };
    //     const passengers = [{ passengerId: 0 }, { passengerId: 2 }];
    //     const params = {
    //         order: order,
    //         orderItem: orderItem,
    //         ticket: ticket,
    //         passengers: passengers
    //     };
    //     utils.getPromise('http://localhost:8080/createOrder', params).then(json => {
    //         console.log(json);
    //         json = JSON.parse(json);
    //         this.goToPay(json);
    //     }, error => {
    //         console.error('出错了', error);
    //     });
    //     this.goToPay();
    // }
    // goToPay = json => {
    //     const passenger = this.state.passengers[0];
    //     const path = {
    //         pathname: '/result',
    //         query: {
    //             passenger: passenger,
    //             resultInfo: json
    //         }
    //     };
    //     // this.createOrder();
    //     this.props.history.push(path);
    // }
    // getContactName = event =>{
    //     console.log(event.target.value);
    //     if (event.target.value.length >= 11) {
    //         this.setState({
    //             showMaxNameTip: true
    //         });
    //     } else {
    //         this.setState({
    //             contactName: event.target.value,
    //             showMaxNameTip: false
    //         });
    //     }
    // }
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
    getContactName = event =>{
        console.log(event.target.value);
        if (event.target.value.length >= 11) {
            this.setState({
                showMaxNameTip: true
            });
        } else {
            this.setState({
                contactName: event.target.value,
                showMaxNameTip: false
            });
        }
    }
    getContactPhone = event =>{
        console.log(event.target.value);
        if (event.target.value.length >= 11) {
            this.setState({
                showMaxPhoneTip: true
            });
        } else {
            this.setState({
                contactPhone: event.target.value,
                showMaxPhoneTip: false
            });
        }
    }
    getContactEmail = event =>{
        console.log(event.target.value);
        if (event.target.value.length >= 11) {
            this.setState({
                showMaxEmailTip: true
            });
        } else {
            this.setState({
                contactEmail: event.target.value,
                showMaxEmailTip: false
            });
        }
    }
    focusName = () => {
        this.setState({
            showNamePassTip: false
        });
    }
    focusPhone = () => {
        this.setState({
            showPhonePassTip: false
        });
    }
    focusEmail = () => {
        this.setState({
            showEmailPassTip: false
        });
    }
    validateName = event =>{
        if (!this.state.showMaxNameTip && event.target.value) {
            this.setState({
                showNamePassTip: true
            });
        }
    }
    validatePhone = event =>{
        if (!this.state.showMaxNameTip && event.target.value) {
            this.setState({
                showPhonePassTip: true
            });
        }
    }
    validateEmail = event =>{
        if (!this.state.showMaxNameTip && event.target.value) {
            this.setState({
                showEmailPassTip: true
            });
        }
    }
    render() {
        return (
            <div className="book">
                <Header params={params} isBook/>
                <div className="person-title">选择/新增乘客</div>
                <div className="person-list">
                    {this.state.passengers.map((passenger, index) =>
                        <div className="person" key={index}>
                            <div className="name">{passenger.name}</div>
                            <div className="card">{'身份证号 ' + passenger.cardNumber}</div>
                        </div>
                    )}
                    {/* <div className="more">更多...</div> */}
                </div>
                {/* <div className="passenger-list">
                    旅客1 成人
                </div> */}
                <div className="add-passenger-btn">
                +乘客
                </div>
                <div className="contact-person-txt"> 联络人信息</div>
                <div className="txt">若您预定的行程有任何问题，我们会主动联系您。</div>
                <div className="contact-person-form">
                    <div className="input-item">
                        <input onChange={this.getContactName} onBlur={this.validateName} onFocus={this.focusName}
                            value={this.state.contactName} type="text" placeholder="联系人姓名"/>
                        {this.state.showMaxNameTip && <div>姓名长度最大为10位</div>}
                        {this.state.showNamePassTip && <div className="pass">验证通过</div>}
                    </div>
                    <div className="input-item">
                        <input type="text"  onFocus={this.focusPhone} onBlur={this.validatePhone} onChange={this.getContactPhone} value={this.state.contactPhone} placeholder="联系电话"/>
                        {this.state.showMaxPhoneTip && <div>电话号码最多为11位</div>}
                        {this.state.showPhonePassTip && <div className="pass">验证通过</div>}
                    </div>
                    <div className="input-item">
                        <input type="text"  onFocus={this.focusEmail} onBlur={this.validateEmail} onChange={this.getContactEmail}  value={this.state.contactEmail} placeholder="电子邮箱"/>
                        {this.state.showMaxEmailTip && <div>邮箱格式不正确</div>}
                        {this.state.showEmailPassTip && <div className="pass">验证通过</div>}
                    </div>
                </div>
                <div className="service-phone">
                    目前手机网页版仅支持购买成人票。如需预定小童或婴儿票，請致电18796283298
                </div>
                {/* <div className="blue">
                中國國際航空對行李之相關規定
                </div>
                <div className="blue">
                中國國際航空對限制物品之相關規定
                </div> */}
                <div className="tit">条款即细则
                </div>
                <div className="prompt">按下＂付款＂以确认同意
                </div>
                <div className="price">
                    <div className="tit">总价</div>
                    <div><span className="money-type">人名币</span><span className="number">6666</span></div>
                </div>
                <div className="comfirm-btn" onClick={this.createOrder}>确认</div>
                <div className="secured">祝您旅途愉快！</div>
                <Footer />
            </div>
        );
    }
}
