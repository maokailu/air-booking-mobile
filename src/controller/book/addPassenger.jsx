import React from 'react';
import './addPassenger.scss';
import utils from '../../resources/utils';
export default class addPassenger extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        lastName: '',
        firstName: '',
        gender: 0,
        cardNumber: '',
        birthday: ''
    }
    inputLastName = event =>{
        this.setState({
            lastName: event.target.value
        });
    }
    inputFirstName = event =>{
        this.setState({
            firstName: event.target.value
        });
    }
    inputCardNumber = event =>{
        this.setState({
            cardNumber: event.target.value
        });
    }
    inputBirthday = event =>{
        this.setState({
            birthday: event.target.value
        });
    }
    confirm = () => {
        const param = {
            passengerId: new Date().getTime(),
            name: this.state.lastName + this.state.firstName,
            ownership: 'ZH',
            userId: 0,
            cardNumber: this.state.cardNumber,
            birthday: new Date(),
            gender: this.state.gender
        };
        utils.getPromise('http://localhost:8080/addPassengers', param).then(json => {
            // debugger
            this.props.addPassengerCallBack(1, param);
            console.log(json);
        }, error => {
            this.props.addPassengerCallBack(1);
            console.log(error);
        });
    }
    render() {
        return (
            <div className="addPassenger">
                <div className="title-info">
                    <span className="title-btn" onClick={()=>this.props.addPassengerCallBack(0)}>取消</span>
                    <span className="title">乘客</span>
                    <span className="title-btn" onClick={this.confirm}>确认</span>
                </div>
                <div className="main">
                    <div className="text">请输入乘客的姓名，姓名需与身份证一致。提交订单后一般不可修改或缴交额外费用。</div>
                    <div className="text">请确保您的身份证于出发日期后的六个月有效。</div>
                    <div className="text">此预定须输入身份证明文件资料。</div>
                    <div className="input-box">
                        <input onChange={this.inputLastName}
                            value={this.state.lastName} className="last-name" placeholder="姓氏" type="text" />
                        <input onChange={this.inputFirstName}
                            value={this.state.firstName} type="text" placeholder="名" />
                    </div>
                    <div className="gender">
                        <div>男</div>
                        <div>女</div>
                    </div>
                    <div className="input-box">
                        <input onChange={this.inputCardNumber}
                            value={this.state.cardNumber} className="last-name" placeholder="身份证号" type="text" />
                        <input onChange={this.inputBirthday}
                            value={this.state.birthday} type="text" placeholder="出发日期" />
                    </div>
                </div>
            </div>
        );
    }
}
