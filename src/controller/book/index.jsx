import React from 'react';
import './style.scss';
import { fetchData, getUrlParam, getCookie } from '../../resources/utils';
import Footer from 'footer';
import Header from 'header';
import AddPassenger from './addPassenger';
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
        showNamePassTip: false,
        showError: false,
        passengersId: [],
        showAddPassenger: false,
        ticketPrice: parseInt(getUrlParam('ticketPrice')),
        airportTax: parseInt(getUrlParam('airportTax')),
        totalPrice: parseInt(getUrlParam('totalPrice'))
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        const userId =  getCookie('userId');
        if (userId) {
            const param = `userId=${userId}`;
            fetchData(`getPassengers?${param}`).then(json => {
                this.setState({
                    passengers: json
                });
            }, error => {
                console.error('出错了', error);
            });
        } else {
            // const path = {
            //     pathname: `/login`
            // };
            // this.props.history.push(path);
        }
    }
    createOrder = () => {
        const userId =  getCookie('userId');
        if (userId) {
            const order = {
            // 从cookie中取，如果没有，要求登陆
                userId: userId,
                contactName: this.state.contactName,
                orderDate: new Date(),
                orderState: 1,
                totalTicketPrice: this.state.ticketPrice,
                // totalFuelSurcharge: 0,
                totalAirportTax: this.state.airportTax,
                totalPrice: (this.state.totalPrice * this.state.passengersId.length) || this.state.totalPrice,
                cellphone: this.state.contactPhone,
                email: this.state.contactEmail
            };
            const orderItem = {
                seatRequire: 1
            };
            const ticket = {
                flightId: getUrlParam('flightId1') + '-' + getUrlParam('flightId2'),
                cabinClassId: getUrlParam('cabinClassId')
            };
            let passengers = [];
            for (let i = 0; i < this.state.passengersId.length; i++) {
                let obj = {};
                obj = {
                    passengerId: this.state.passengersId[i]
                };
                passengers.push(obj);
            }
            const params = {
                order: order,
                orderItem: orderItem,
                ticket: ticket,
                passengers: passengers
                // flightNo: flightNo
            };
            fetchData('booking', params).then(json => {
                console.log(json);
                json = JSON.parse(json);
                this.goToPay(json);
            }, error => {
                console.error('出错了', error);
            });
        } else {
            // 跳转登陆框
            const path = {
                pathname: `/login`
            };
            this.props.history.push(path);
        }
    }
    goToPay = json => {
        // const passenger = this.state.passengers[0];
        // const path = {
        //     pathname: '/result',
        //     query: {
        //         passenger: passenger,
        //         resultInfo: json
        //     }
        // };
        // this.props.history.push(path);
        let resultInfo;
        if (json) {
            resultInfo = '购票完成，可至我的订单查看！';
        } else {
            resultInfo = '失败购票，请重试！';
        }
        const query = `resultInfo=${resultInfo}`;

        const path = {
            pathname: `/result`,
            search: query
        };
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
        if (event.target.value.length >= 20) {
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
    selectPassenger =(event, passenger) =>{
        const passengerId = parseInt(passenger.passengerId);
        const passengersId = this.state.passengersId;
        const index = passengersId.indexOf(passengerId);
        if (index === -1) {
            passengersId.push(passengerId);
            this.setState({
                passengersId: passengersId
            });
        } else {
            passengersId.splice(index, 1);
            this.setState({
                passengersId: passengersId
            });
        }
        console.log(passengersId);
    }
    addPassenger = () => {
        this.setState({
            showAddPassenger: true
        });
    }
    addPassengerCallBack = (isConfirm, data) =>{
        if (isConfirm) {
            if (data) {
                const passengers = this.state.passengers;
                const passengersId = this.state.passengersId;
                const passenger = {
                    name: data.name,
                    cardNumber: data.cardNumber,
                    passengerId: data.passengerId
                };
                passengers.push(passenger);
                passengersId.push(data.passengerId);
                this.setState({
                    passengers: passengers,
                    passengersId: passengersId
                });
                console.log(data.passengerId);
            }
        }
        this.setState({
            showAddPassenger: false
        });
    }
    render() {
        return (
            <div>
                {!this.state.showAddPassenger && <div className="book">
                    <Header isBook/>
                    <div className="person-title">选择/新增乘客</div>
                    <div className="person-list">
                        {this.state.passengers.map((passenger, index) =>
                            <div className="person-info" key={index}
                                onClick={(event)=>this.selectPassenger(event, passenger)}>
                                <div className="person">
                                    <div className="name">{passenger.name}</div>
                                    <div className="card">{'身份证号 ' + passenger.cardNumber}</div>
                                </div>
                                {this.state.passengersId.indexOf(parseInt(passenger.passengerId)) !== -1
                                    && <div className="checked">
                                    已选
                                    </div>}
                            </div>
                        )}
                        <div className="add-passenger-btn" onClick={this.addPassenger}>
                            <i className="icon-plus"></i><span>新增乘客</span>
                        </div>
                        {/* <div className="more">更多...</div> */}
                    </div>
                    {/* <div className="passenger-list">
                        旅客1 成人
                    </div> */}
                    <div className="contact-person-txt"> 联络人信息</div>
                    <div className="txt">若您预定的行程有任何问题，我们会主动联系您。</div>
                    <div className="contact-person-form">
                        <div className="input-item" style={{ border: 0 }}>
                            <input onChange={this.getContactName} onBlur={this.validateName} onFocus={this.focusName}
                                value={this.state.contactName} type="text" placeholder="联系人姓名"/>
                            {this.state.showMaxNameTip && <div>姓名长度最大为10位</div>}
                            {/* {this.state.showNamePassTip && <div className="pass">验证通过</div>} */}
                        </div>
                        <div className="input-item">
                            <input type="text"  onFocus={this.focusPhone} onBlur={this.validatePhone}
                                onChange={this.getContactPhone} value={this.state.contactPhone} placeholder="联系电话"/>
                            {this.state.showMaxPhoneTip && <div>电话号码最多为11位</div>}
                            {/* {this.state.showPhonePassTip && <div className="pass">验证通过</div>} */}
                        </div>
                        <div className="input-item">
                            <input type="text"  onFocus={this.focusEmail} onBlur={this.validateEmail}
                                onChange={this.getContactEmail}  value={this.state.contactEmail} placeholder="电子邮箱"/>
                            {this.state.showMaxEmailTip && <div>邮箱最多为20位</div>}
                            {this.state.showError && <div>邮箱格式不正确</div>}
                            {/* {this.state.showEmailPassTip && <div className="pass">验证通过</div>} */}
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
                    <div className="price-row style2">
                        <span>成人</span>
                        <span className="right">{'人民币 ' + (this.state.totalPrice) + 'X'
                        + (this.state.passengersId.length === 0 ? 1 : this.state.passengersId.length)}元</span>
                    </div>
                    <div className="price-row style1">
                        <span>票价</span>
                        <span className="right">{'人民币 ' + this.state.ticketPrice }元</span>
                    </div>
                    <div className="price-row style1">
                        <span>{'税&服务费'}</span>
                        <span className="right">{'人民币 ' + this.state.airportTax}元</span>
                    </div>
                    <div className="price">
                        <div className="tit">总价</div>
                        <div style={{ marginRight: '10px' }}><span className="money-type">人名币</span>
                            <span className="number">{((this.state.totalPrice * this.state.passengersId.length)
                                || this.state.totalPrice) + '元'}</span></div>
                    </div>
                    <div className="comfirm-btn" onClick={this.createOrder}>确认</div>
                    <div className="secured">祝您旅途愉快！</div>
                    <Footer />
                </div>}
                {this.state.showAddPassenger && <AddPassenger addPassengerCallBack={this.addPassengerCallBack}/>}
            </div>
        );
    }
}
