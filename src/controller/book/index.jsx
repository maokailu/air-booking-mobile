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
        const params = {
            orderId: 2,
            userId: 2,
            userName: '毛凯露'
        };
        utils.getPromise('http://localhost:8080/createOrder', params).then(json => {
            console.log(json);
            this.goToPay();
        }, error => {
            console.error('出错了', error);
        });
    }
    goToPay = () => {
        const passenger = this.state.passengers[0];
        const path = {
            pathname: '/result',
            passenger: passenger
        };
        // this.createOrder();
        this.props.history.push(path);
    }
    render() {
        return (
            <div className="book" onClick={this.goToPay}>
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
