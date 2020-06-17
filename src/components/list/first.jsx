import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect } from 'react';
import './style.scss';
import Item from './item';


function First(props) {
    const flight = { flightNo: 'HK123', des: '航班信息' };
    const [flights, setFlights] = useState([]);
    console.log(new Array(1000).fill(flight), flights);
    useEffect(() => {
        setFlights(new Array(1000).fill(flight));
    }, []);
    return (
        <div>
            <div className="list">
                {flights.map((item, index) =>
                    <div key={index} className="item">
                        <Item {...item}/>
                    </div>
                )}
            </div>
        </div>
    );
}
export default hot(First);
