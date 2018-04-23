import React from 'react';
import './search.scss';
import utils from '../resources/utils';
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
        departCityCode: this.props.location.departCityCode
    }
    componentDidMount() {
        const params = {
            departCityCode: this.state.departCityCode
        };
        utils.getPromise('http://localhost:8080/fecthFlightsFlight', params).then(json => {
            console.log('Contents: ' + json);
            this.setState({
                flights: json,
                test: json
            });
        }, error => {
            console.error('出错了', error);
        });
    }
    render() {
        return (
            <div className="list">
                {this.state.flights && this.state.flights.map((flight, index) =>
                    <div key={index} className="item">
                        <div className="row1">
                            <img className="logo" src="http://pic.english.c-ctrip.com/airline_logo/32/zh.png"/>
                            <span className="airline">{flight.name}</span>
                            <span className="airline">{flight.flightId}</span>
                        </div>
                        <div className="row2">
                        14:40
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
