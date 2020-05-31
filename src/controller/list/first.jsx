import { hot } from 'react-hot-loader/root';
import React from 'react';
import './style.scss';
import { fetchData, getUrlParam } from '../../lib/utils';

let param = {};
let start = 0;
let size  = 6;
let hasToBottom = false;
const flight =
{ flightId: 'HK123', departTime: 1590807959568, returnTime: 1590807959568, airportTax: 1, ticketPrice: 111 };

class First extends React.Component {
    state = {
        flights: new Array(100).fill(flight),
        test: null,
        isShowBtn: false,
        departCityCode: localStorage.getItem('departCityCode') || 'SHA'
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        start = getUrlParam('start');
        // this.getFlights();
        window.addEventListener('scroll', this.getMore);
    }
    getFlights = () => {
        param = {
            departCityCode: getUrlParam('departCityCodeSearch'),
            arriveCityCode: getUrlParam('arriveCityCodeSearch'),
            flightType: getUrlParam('flightType'),
            departAirportCode: getUrlParam('departAirportCodeSearch'),
            arriveAirportCode: getUrlParam('arriveAirportCodeSearch'),
            departTime: getUrlParam('departTimeSearch'),
            returnTime: getUrlParam('returnTimeSearch'),
            classType: getUrlParam('classType'),
            passenger: getUrlParam('passenger')
        };
        const str = `start=${start}&size=${size}`;
        fetchData(`getFlights?${str}`, param).then(json => {
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
        const query = `departCityNameSearch=${getUrlParam('departCityNameSearch')}&arriveCityNameSearch=${getUrlParam('arriveCityNameSearch')}`
            + `&departCityCodeSearch=${getUrlParam('departCityCodeSearch')}&arriveCityCodeSearch=${getUrlParam('arriveCityCodeSearch')}`
            + `&departAirportCodeSearch=${getUrlParam('departAirportCodeSearch')}&arriveAirportCodeSearch=${getUrlParam('arriveAirportCodeSearch')}`
            + `&departAirportNameSearch=${getUrlParam('departAirportNameSearch')}&departAirportNameSearch=${getUrlParam('departAirportNameSearch')}`
            + `&departTimeSearch=${getUrlParam('departTimeSearch')}&returnTimeSearch=${getUrlParam('returnTimeSearch')}`
            + `&passenger=${getUrlParam('passenger')}`
            + `&flightType=${getUrlParam('flightType')}&classType=${getUrlParam('classType')}`
            // + `&start=${}` // 分页稍后 用于进来时从0开始 用react-router的钩子
            + `&departAirportCode1=${flight.departAirportCode}&arriveAirportCode1=${flight.arriveAirportCode}`
            + `&departAirportName1=${flight.departAirportName}&arriveAirportName1=${flight.arriveAirportName}`
            + `&departTime1=${flight.departTime}&arriveTime1=${flight.returnTime}`// 后端返回的returnTime实际为该航班的arriveTime，数据库字段设计错误，稍后修改
            + `&flightId1=${flight.flightId}`
            + `&airportTax1=${flight.airportTax}`
            + `&ticketPrice1=${flight.ticketPrice}`;
        let path;
        if (parseInt(getUrlParam('flightType'))) {
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
    changeStatus = () => {
        this.setState({
            isShowBtn: true
        });
    }
    render() {
        return (
            <div>
                <div className="list" onClick={this.changeStatus}>
                    {this.state.flights && this.state.flights.map((flight, index) =>
                        <div key={index} className="item">
                            {this.state.isShowBtn && <div>BTN</div>}ddddddff
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
            </div>
        );
    }
}
export default hot(First);
