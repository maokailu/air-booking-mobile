import React from 'react';
import './style.scss';
import utils from '../../resources/utils';
export default class List extends React.Component {
    constructor(props) {
        super(props);
        // var data = this.props.location.query;
        // var { id, name, age } = data;
        // console.log(id, name, age);
        // var departCityCode  = data;
        // console.log(departCityCode);
    }

    state = {
        flights: null,
        test: null,
        departCityCode: this.props.location.departCityCode || 'SHA'
    }
    componentDidMount() {
        const params = { departCityCode: this.state.departCityCode, arriveCityCode: 'HKG' };
        utils.getPromise('http://localhost:8080/fecthFlightsFlight', params).then(json => {
            json = JSON.parse(json);
            this.setState({
                flights: json
            });
        }, error => {
            console.error('出错了', error);
        });
    }
    goToDetail = () => {
        const path = {
            pathname: '/detail',
            listcode: 'listcode'
        };
        this.props.history.push(path);
    }
    render() {
        return (
            <div className="list" onClick={this.goToDetail}>
                {this.state.flights && this.state.flights.map((flight, index) =>
                    <div key={index} className="item">
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
        );
    }
}
