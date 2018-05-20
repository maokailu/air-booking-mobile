import React from 'react';
import './style.scss';
import utils from '../../resources/utils';
import Header from '../header';
import Footer from '../footer';
let param = '';
export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        flights: null,
        test: null,
        departCityCode: localStorage.getItem('departCityCode') || 'SHA'
    }
    componentDidMount() {
        param = {
            departCityCode: utils.getUrlParam('departCityCode'),
            arriveCityCode: utils.getUrlParam('arriveCityCode'),
            flightType: utils.getUrlParam('tripType'),
            departAirportCode: utils.getUrlParam('departAirportCode'),
            arriveAirportCode: utils.getUrlParam('arriveAirportCode'),
            departTime: utils.getUrlParam('departDate'),
            returnTime: utils.getUrlParam('returnDate'),
            classType: utils.getUrlParam('classType'),
            passenger: utils.getUrlParam('passenger')
        };
        utils.getPromise('http://localhost:8080/getFlights', param).then(json => {
            this.setState({
                flights: json
            });
        }, error => {
            console.error('出错了', error);
        });
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
                <Header/>
                <div className="list">
                    {this.state.flights && this.state.flights.map((flight, index) =>
                        <div key={index} className="item"  onClick={()=>this.goToDetail(flight)}>
                            <div className="row1">
                                <img className="logo" src="http://pic.english.c-ctrip.com/airline_logo/32/zh.png"/>
                                <span className="airline">{flight.departCityCode}</span>
                                <span className="airline">{flight.departCityCode}</span>
                            </div>
                            <div className="row2">
                                <div className="left">
                                    <div className="column1">
                                        <div className="time">13:50</div>
                                        <div className="loc">PVG T2</div>
                                    </div>
                                    <span className="arrow"></span>
                                    <div className="column2">
                                        <div className="time">13:50</div>
                                        <div className="loc">PVG T2</div>
                                    </div>
                                </div>
                                <span className="price">$370</span>
                            </div>
                            <div className="row3">
                            2h40mh
                            </div>
                        </div>
                    )}
                </div>
                <Footer style={{ backgroundColor: '#EFEFF4' }}/>
            </div>
        );
    }
}
