import React from 'react';
import './style.scss';
import utils from '../../resources/utils';
import Header from '../header';
import Footer from '../footer';
let param = {};
let size  = 6;
let hasToBottom = false;
export default class Next extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        flights: [],
        test: null,
        departCityCode: localStorage.getItem('departCityCode') || 'SHA'
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.getFlights();
        window.addEventListener('scroll', this.getMore);
    }
    getFlights = () => {
        param = {
            departCityCode: utils.getUrlParam('arriveCityCodeSearch'),
            arriveCityCode: utils.getUrlParam('departCityCodeSearch'),
            flightType: utils.getUrlParam('flightType'),
            departAirportCode: utils.getUrlParam('arriveAirportCodeSearch'),
            arriveAirportCode: utils.getUrlParam('departAirportCodeSearch'),
            departTime: utils.getUrlParam('returnTimeSearch'),
            classType: utils.getUrlParam('classType'),
            passenger: utils.getUrlParam('passenger')
        };
        const start = 0; // patch
        const str = `start=${start}&size=${size}`;
        utils.getPromise(`getFlights?${str}`, param).then(json => {
            if (json.length === 0) {
                hasToBottom = true;
            } else {
                if (this.state.flights && this.state.flights.length > 0) {
                    this.setState(prevState => ({
                        flights: prevState.flights.concat(json)
                    }));
                } else {
                    // start = 0;
                    this.setState({
                        flights: json
                    });
                }
            }
        }, error => {
            console.error('出错了', error);
        });
    }
    getMore = () =>{
        if (!hasToBottom) {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            var windowHeight =  document.documentElement.clientHeight || document.body.clientHeight;
            if (scrollTop + windowHeight > scrollHeight) {
                console.log('已经到最底部了！');
                this.getFlights();
            }
        }
    }
    goToDetail = flight => {
        console.log(flight);
        const query =   `departCityNameSearch=${utils.getUrlParam('departCityNameSearch')}&arriveCityNameSearch=${utils.getUrlParam('arriveCityNameSearch')}`
            + `&departCityCodeSearch=${utils.getUrlParam('departCityCodeSearch')}&arriveCityCodeSearch=${utils.getUrlParam('arriveCityCodeSearch')}`
            + `&departAirportCodeSearch=${utils.getUrlParam('departAirportCodeSearch')}&arriveAirportCodeSearch=${utils.getUrlParam('arriveAirportCodeSearch')}`
            + `&departAirportNameSearch=${utils.getUrlParam('departAirportNameSearch')}&departAirportNameSearch=${utils.getUrlParam('departAirportNameSearch')}`
            + `&departTimeSearch=${utils.getUrlParam('departTimeSearch')}&returnTimeSearch=${utils.getUrlParam('returnTimeSearch')}`
            + `&passenger=${utils.getUrlParam('passenger')}`
            + `&flightType=${utils.getUrlParam('flightType')}&classType=${utils.getUrlParam('classType')}`


            + `&departAirportCode1=${utils.getUrlParam('departAirportCode1')}&arriveAirportCode1=${utils.getUrlParam('arriveAirportCode1')}`
            + `&departAirportName1=${utils.getUrlParam('departAirportName1')}&arriveAirportName1=${utils.getUrlParam('arriveAirportName1')}`
            + `&departTime1=${utils.getUrlParam('departTime1')}&arriveTime1=${utils.getUrlParam('arriveTime1')}`
            + `&flightId1=${utils.getUrlParam('flightId1')}`
            + `&airportTax1=${utils.getUrlParam('airportTax1')}`
            + `&ticketPrice1=${utils.getUrlParam('ticketPrice1')}`
            + `&departAirportCode2=${flight.departAirportCode}&arriveAirportCode2=${flight.arriveAirportCode}`
            + `&departAirportName2=${flight.departAirportName}&arriveAirportName2=${flight.arriveAirportName}`
            + `&departTime2=${flight.departTime}&arriveTime2=${flight.returnTime}`
            + `&flightId2=${flight.flightId}`
            + `&airportTax2=${flight.airportTax}`
            + `&ticketPrice2=${flight.ticketPrice}`;
        const path = {
            pathname: `/detail`,
            search: query
        };
        console.log('query' + query);
        this.props.history.push(path);
    }
    render() {
        return (
            <div>
                <Header isList/>
                <div className="list">
                    {this.state.flights && this.state.flights.length !== 0 && this.state.flights.map((flight, index) =>
                        <div key={index} className="item"  onClick={()=>this.goToDetail(flight)}>
                            <div className="row1">
                                <img className="logo" />
                                <span>{' ' + flight.flightId}</span>
                            </div>
                            <div className="row2">
                                <div className="left">
                                    <div className="column1">
                                        <div className="time">
                                            {(new Date(flight.departTime)).getHours() + ':' +
                                            (new Date(flight.departTime)).getMinutes()}</div>
                                        <div className="loc">{flight.departAirportName}</div>
                                    </div>
                                    <i className={'arrow-right-semiangle'}/>
                                    <div className="column2">
                                        <div className="time">{(new Date(flight.returnTime)).getHours() + ':' +
                                        (new Date(flight.returnTime)).getMinutes()}</div>
                                        <div className="loc">{flight.arriveAirportName}</div>
                                    </div>
                                </div>
                                <span className="price">{'人民币 ' + (parseInt(flight.airportTax) +
                                parseInt(flight.ticketPrice)) + '元'}</span>
                            </div>
                            <div className="row3">
                                <i className="icon-clock" />
                                { Math.round(((parseInt(flight.returnTime - flight.departTime))
                                    / 1000 / 60 / 60)) + '小时'}
                                { Math.round(((parseInt(flight.returnTime - flight.departTime))
                                    / 1000 / 60 % 60)) + '分'}
                            </div>
                        </div>
                    )}
                </div>
                <Footer style={{ backgroundColor: '#EFEFF4' }}/>
            </div>
        );
    }
}
