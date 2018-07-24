import React from 'react';
import './style.scss';
import utils from '../../resources/utils';
import Header from '../header';
import Footer from '../footer';
let param = {};
let start = 0;
let size  = 6;
let hasToBottom = false;
export default class First extends React.Component {
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
        start = utils.getUrlParam('start');
        this.getFlights();
        window.addEventListener('scroll', this.getMore);
    }
    getFlights = () => {
        param = {
            departCityCode: utils.getUrlParam('departCityCodeSearch'),
            arriveCityCode: utils.getUrlParam('arriveCityCodeSearch'),
            flightType: utils.getUrlParam('flightType'),
            departAirportCode: utils.getUrlParam('departAirportCodeSearch'),
            arriveAirportCode: utils.getUrlParam('arriveAirportCodeSearch'),
            departTime: utils.getUrlParam('departTimeSearch'),
            returnTime: utils.getUrlParam('returnTimeSearch'),
            classType: utils.getUrlParam('classType'),
            passenger: utils.getUrlParam('passenger')
        };
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
            if ((scrollTop + windowHeight) >= scrollHeight) {
                console.log('已经到最底部了！');
                start++;
                this.getFlights();
            }
        }
    }
    goToNextPage = flight => {
        console.log(flight);
        const query = `departCityNameSearch=${utils.getUrlParam('departCityNameSearch')}&arriveCityNameSearch=${utils.getUrlParam('arriveCityNameSearch')}`
            + `&departCityCodeSearch=${utils.getUrlParam('departCityCodeSearch')}&arriveCityCodeSearch=${utils.getUrlParam('arriveCityCodeSearch')}`
            + `&departAirportCodeSearch=${utils.getUrlParam('departAirportCodeSearch')}&arriveAirportCodeSearch=${utils.getUrlParam('arriveAirportCodeSearch')}`
            + `&departAirportNameSearch=${utils.getUrlParam('departAirportNameSearch')}&departAirportNameSearch=${utils.getUrlParam('departAirportNameSearch')}`
            + `&departTimeSearch=${utils.getUrlParam('departTimeSearch')}&returnTimeSearch=${utils.getUrlParam('returnTimeSearch')}`
            + `&passenger=${utils.getUrlParam('passenger')}`
            + `&flightType=${utils.getUrlParam('flightType')}&classType=${utils.getUrlParam('classType')}`
            // + `&start=${}` // 分页稍后 用于进来时从0开始 用react-router的钩子
            + `&departAirportCode1=${flight.departAirportCode}&arriveAirportCode1=${flight.arriveAirportCode}`
            + `&departAirportName1=${flight.departAirportName}&arriveAirportName1=${flight.arriveAirportName}`
            + `&departTime1=${flight.departTime}&arriveTime1=${flight.returnTime}`// 后端返回的returnTime实际为该航班的arriveTime，数据库字段设计错误，稍后修改
            + `&flightId1=${flight.flightId}`
            + `&airportTax1=${flight.airportTax}`
            + `&ticketPrice1=${flight.ticketPrice}`;
        let path;
        if (parseInt(utils.getUrlParam('flightType'))) {
            path = {
                pathname: `/detail`,
                search: query
            };
        } else {
            path = {
                pathname: `/next`,
                search: query
            };
        }
        this.props.history.push(path);
    }
    render() {
        return (
            <div>
                <Header isList/>
                <div className="list">
                    {this.state.flights && this.state.flights.map((flight, index) =>
                        <div key={index} className="item"  onClick={()=>this.goToNextPage(flight)}>
                            <div className="row1">
                                <img className="logo"
                                    src={``}/>
                                {/* <img className="logo" src={`../../resources/img/
                            ${Math.round(index + 1 / 3)}.png`}/> */}
                                {/* <span className="airline">
                                    {['海南航空', '厦门航空', '中国国航', '东方航空', '吉祥航空'][(Math.round((index + 1) / 3))]}</span> */}
                                <span>{' ' + flight.flightId}</span>
                            </div>
                            <div className="row2">
                                <div className="left">
                                    <div className="column1">
                                        <div className="time">
                                            {(new Date(flight.departTime)).getHours() + ':'
                                            + (new Date(flight.departTime)).getMinutes()}
                                        </div>
                                        <span className="loc">{flight.departAirportName}</span>
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
