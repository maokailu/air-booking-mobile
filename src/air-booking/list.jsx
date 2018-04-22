import React from 'react';
import './search.scss';
import utils from '../resources/utils';
export default class List extends React.Component {
    constructor() {
        super();
    }

    state = {
        flights: null,
        test: null
    }
    componentDidMount() {
        utils.getPromise('http://localhost:8080/fecthFlights').then(json => {
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
