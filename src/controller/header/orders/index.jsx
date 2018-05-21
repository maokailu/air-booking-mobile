import React from 'react';
import './style.scss';
import utils from '../../../resources/utils';
import Header from 'header';
import Footer from 'footer';
let param = {};
let logoPic = ['hu', 'mf', 'ca', 'ho', 'mu'];
export default class Orders extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        flights: null,
        test: null,
        departCityCode: localStorage.getItem('departCityCode') || 'SHA'
    }
    componentDidMount() {
        let userId = utils.getCookie('userId');
        if (userId) {
            userId = utils.getCookie('userId');
            utils.getPromise(`http://localhost:8080/getOrdersByUserId?userId=${userId}`).then(json => {
                this.setState({
                    // flights: json
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
    goToDetail = flight => {
        console.log(flight);
        const query = `departCityName=${utils.getUrlParam('departCityName')}&arriveCityName=${utils.getUrlParam('arriveCityName')}`
            + `&departCityCode=${utils.getUrlParam('departCityCode')}&arriveCityCode=${utils.getUrlParam('arriveCityCode')}`
            + `&departAirportCode=${flight.departAirportCode}&arriveAirportCode=${flight.arriveAirportCode}`
            + `&departAirportName=${flight.departAirportName}&arriveAirportName=${flight.arriveAirportName}`
            + `&departTime=${flight.departTime}&returnTime=${flight.returnTime}`
            + `&passenger=${utils.getUrlParam('passenger')}&flightId=${flight.flightId}`
            + `&tripType=${flight.flightType}&classType=${utils.getUrlParam('classType')}`
            + `&airportTax=${flight.airportTax}`
            + `&ticketPrice=${flight.ticketPrice}`;
        const path = {
            pathname: `/detail`,
            search: query
        };
        this.props.history.push(path);
    }
    render() {
        return (
            <div>
                <Header isBook/>
                <div className="list">
                    {this.state.flights && this.state.flights.map((flight, index) =>
                        <div key={index} className="item"  onClick={()=>this.goToDetail(flight)}>
                            <div className="row1">
                                <img className="logo" src={`http://pic.english.c-ctrip.com/airline_logo/32/${logoPic[Math.round(index + 1 / 3)]}.png`}/>
                                {/* <img className="logo" src={`../../resources/img/${Math.round(index + 1 / 3)}.png`}/> */}
                                <span className="airline">{['海南航空', '厦门航空', '中国国航', '东方航空', '吉祥航空'][(Math.round(index + 1 / 3))]}</span>
                            </div>
                            <div className="row2">
                                <div className="left">
                                    <div className="column1">
                                        <div className="time">{(new Date(flight.departTime)).getHours() + ':' + (new Date(flight.departTime)).getMinutes()}</div>
                                        <div className="loc">{flight.departAirportName}</div>
                                    </div>
                                    <span className="arrow"></span>
                                    <div className="column2">
                                        <div className="time">{(new Date(flight.returnTime)).getHours() + ':' + (new Date(flight.returnTime)).getMinutes()}</div>
                                        <div className="loc">{flight.arriveAirportName}</div>
                                    </div>
                                </div>
                                <span className="price">{'人民币 ' + (parseInt(flight.airportTax) + parseInt(flight.ticketPrice)) + '元'}</span>
                            </div>
                            <div className="row3">
                                { Math.round(((parseInt(flight.returnTime - flight.departTime)) / 1000 / 60 / 60)) + '小时'}
                                { Math.round(((parseInt(flight.returnTime - flight.departTime)) / 1000 / 60 % 60)) + '分'}
                            </div>
                        </div>
                    )}
                </div>
                <Footer style={{ backgroundColor: '#EFEFF4' }}/>
            </div>
        );
    }
}
