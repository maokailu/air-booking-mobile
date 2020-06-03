import React, { useState, useEffect, useMemo } from 'react';
import './style.scss';
import { fetchData, isEmpty, getUrlParam, isMobile, getPromise, getCookie} from '../../resources/utils';

import Header from '../header';
import Footer from '../footer';
let size  = 6;
let hasToBottom = false;
export default function Next(props) {
    // const [params, setParams] = useState([]);
    const [flights, setFlights] = useState([]);
    // compare
    // const initDepartCityCode = useMemo(localStorage.getItem('departCityCode' || 'SHA'));
    // const [departCityCode, setDepartCityCode] = useState(initDepartCityCode);
    useEffect(() => {
        window.scrollTo(0, 0);
        setFlights(getFlights());
        window.addEventListener('scroll', getMore);
    }, []);
    const getFlights = () => {
        const param = {
            departCityCode: getUrlParam('arriveCityCodeSearch'),
            arriveCityCode: getUrlParam('departCityCodeSearch'),
            flightType: getUrlParam('flightType'),
            departAirportCode: getUrlParam('arriveAirportCodeSearch'),
            arriveAirportCode: getUrlParam('departAirportCodeSearch'),
            departTime: getUrlParam('returnTimeSearch'),
            classType: getUrlParam('classType'),
            passenger: getUrlParam('passenger')
        };
        const start = 0; // patch
        const str = `start=${start}&size=${size}`;
        fetchData(`getFlights?${str}`, param).then(json => {
            if (json.length === 0) {
                hasToBottom = true;
            } else {
                if (flights && flights.length > 0) {
                    return flights.concat(json);
                } else {
                    // start = 0;
                    return json;
                }
            }
        }, error => {
            console.error('出错了', error);
        });
    };
    const getMore = () =>{
        if (!hasToBottom) {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            var windowHeight =  document.documentElement.clientHeight || document.body.clientHeight;
            if (scrollTop + windowHeight > scrollHeight) {
                console.log('已经到最底部了！');
                getFlights();
            }
        }
    };
    const goToDetail = flight => {
        console.log(flight);
        const query =   `departCityNameSearch=${getUrlParam('departCityNameSearch')}&arriveCityNameSearch=${getUrlParam('arriveCityNameSearch')}`
            + `&departCityCodeSearch=${getUrlParam('departCityCodeSearch')}&arriveCityCodeSearch=${getUrlParam('arriveCityCodeSearch')}`
            + `&departAirportCodeSearch=${getUrlParam('departAirportCodeSearch')}&arriveAirportCodeSearch=${getUrlParam('arriveAirportCodeSearch')}`
            + `&departAirportNameSearch=${getUrlParam('departAirportNameSearch')}&departAirportNameSearch=${getUrlParam('departAirportNameSearch')}`
            + `&departTimeSearch=${getUrlParam('departTimeSearch')}&returnTimeSearch=${getUrlParam('returnTimeSearch')}`
            + `&passenger=${getUrlParam('passenger')}`
            + `&flightType=${getUrlParam('flightType')}&classType=${getUrlParam('classType')}`


            + `&departAirportCode1=${getUrlParam('departAirportCode1')}&arriveAirportCode1=${getUrlParam('arriveAirportCode1')}`
            + `&departAirportName1=${getUrlParam('departAirportName1')}&arriveAirportName1=${getUrlParam('arriveAirportName1')}`
            + `&departTime1=${getUrlParam('departTime1')}&arriveTime1=${getUrlParam('arriveTime1')}`
            + `&flightId1=${getUrlParam('flightId1')}`
            + `&airportTax1=${getUrlParam('airportTax1')}`
            + `&ticketPrice1=${getUrlParam('ticketPrice1')}`
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
        props.history.push(path);
    };
    return (
        <div>
            <Header isList/>
            <div className="list">
                {flights && flights.length !== 0 && flights.map((flight, index) =>
                    <div key={index} className="item"  onClick={()=>goToDetail(flight)}>
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
