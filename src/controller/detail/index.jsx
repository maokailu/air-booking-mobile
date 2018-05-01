import React from 'react';
import './style.scss';
import classNames from 'classnames';
export default class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            showHeaderMenu: false
        };
    }
    componentDidMount() {
        console.log(localStorage.getItem('flightsId'));
    }
    goToBook = () => {
        this.props.history.push('./book');
    }
    render() {
        classNames({});
        return (
            <div>
                <div className="info">
                    <i className="" />
                    Great Choice!
                </div>
                <div className="box">
                    <div style={{ color: '#666' }}>Fri, Apr 20</div>
                    <div className="flight-list">
                        <div className="time">
                            <span>13:20</span>
                            <span>13:20</span>
                        </div>
                        <div className="city">
                            <span>HKG</span>
                            <span>HKG</span>
                        </div>
                    </div>
                </div>
                <div className="box">
                    <div className="row1">
                        <span className="policy">Good to Know</span>
                        <span className="details">Details</span>
                    </div>
                    <div className="row2">
                        <i className="icon" />Recommended flight
                    </div>
                    <ul className="row3">
                        <li>Includes a free baggage allowance</li>
                        <li>A transit visa may be required</li>
                    </ul>
                </div>
                <div className="box">
                    <span>Still undecided?</span>
                    <div className="change-flight">Change Flight</div>
                    <span className="remind">Just remember, prices can change at any time!</span>
                </div>
                <div className="insurance">
                    <span className="tit">Protect Your Trip</span>
                    <span className="status">Why not protect your trip</span>
                </div>
                <div className="box insurance-box">
                    <i className="insurance-logo" />
                    <div>
                        <span className="column1">Flight Accident Injury Insurance test</span>
                        <span className="column2">Flight Accident Injury Insurance test</span>
                        <span className="column3">Flight Accident Injury Insurance test</span>
                        <span className="column4">Flight Accident Injury Insurance test</span>
                        <i className="icon-check" />
                    </div>
                </div>
                <div className="box">
                    <div className="row">
                        <span>Adult</span>
                        <span className="right">CNY</span>
                    </div>
                    <div className="row">
                        <span>Adult</span>
                        <span className="right">CNY</span>
                    </div>
                    <div className="row">
                        <span>Adult</span>
                        <span className="right">CNY</span>
                    </div>
                    <div className="row border">
                        <span>Adult</span>
                        <span className="right">CNY</span>
                    </div>
                    <div className="btn" onClick={this.goToBook}>Comfirm</div>
                </div>
                <div className="footer">
                    <i className="flight-logo" />
                    <div className="member">30000000 members</div>
                </div>
            </div>
        );
    }
}
