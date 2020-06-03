import { hot } from 'react-hot-loader/root';
import React from 'react';
import './style.scss';
import Item from './item';

const flight = { flightNo: 'HK123', des: '航班信息' };

class First extends React.Component {
    state = {
        flights: new Array(1000).fill(flight),
        test: null,
        isShowBtn: false,
        departCityCode: localStorage.getItem('departCityCode') || 'SHA'
    }
    render() {
        return (
            <div>
                <div className="list" onClick={this.changeStatus} onScroll={this.getMore}>
                    {this.state.flights && this.state.flights.map((flight, index) =>
                        <div key={index} className="item">
                            <Item {...flight}/>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default hot(First);
