import React from 'react';
import './style.scss';
export default class Order extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        orders:
        [
            { 'orderStatus': 'Canceled', 'orderPrice': 'CNY 46888' },
            { 'orderStatus': 'Canceled', 'orderPrice': 'CNY 46888' }
        ]
    }
    render() {
        return (
            <div className="order">
                <div className="title">My Bookings</div>
                <div className="list">
                    {this.state.orders && this.state.orders.map((order, index) =>
                        <div key={index} className="item">
                            <div className="status">
                                <i className="ic-flight" />
                                <span className="text">{order.orderStatus}</span>
                                <span className="price">{order.orderPrice}</span>
                            </div>
                            <div className="location">Singapore -- Shanghai</div>
                            <div className="date">Apr 27, 2018 - Apr 28, 2018</div>
                        </div>
                    )}
                </div>
                <div className="more">More</div>
            </div>
        );
    }
}
