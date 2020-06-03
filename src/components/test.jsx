import { hot } from 'react-hot-loader/root';
import React from 'react';
import './test.scss';


const Test = () => {
    const list = [
        {
            'objectID': '3885A677-2682-4F5F-A7FC-C3C917128A42',
            'type': 'text',
            'name': 'PVG T2 Copy 3',
            'css': ['font-family: Helvetica;', 'font-size: 24px;', 'color: #999999;', 'line-height: 30px;']
        }, {
            'objectID': 'C5F3941E-B852-44E8-AF7E-F75D1E643E57',
            'type': 'text',
            'name': 'JFK T1 Copy 3',
            'css': ['font-family: Helvetica;', 'font-size: 24px;', 'color: #999999;', 'line-height: 30px;']
        }, {
            'objectID': '1A75040C-B388-4BEB-988D-5E62AE384E42',
            'type': 'text',
            'name': 'Duration 02h 35m Copy 3',
            'css': ['font-family: SFProDisplay-Regular;', 'font-size: 24px;', 'color: #999999;', 'line-height: 30px;']
        }
    ];
    const obj = {
        'objectID': 'B072B6F6-BD2A-4729-9E04-FA848BAF61D9',
        'type': 'text', // 决定type为inline-block or block
        'name': 'Checked baggage Incl',
        'css': ['font-family: Roboto-Regular;', 'font-size: 24px;', 'color: #06AEBD;', 'line-height: 32px;']
    };

    const layout = {
        left: '16px',
        width: '144.5px',
        height: '16px'
    };
    const createDiv = item => {
        // const style = String(item.css);
        const style = item.css.join(' ');
        console.log(style);
        return <div key={item.objectID} style={{ color: 'red', width: '10px' }}>
            {item.name || item.childrens}</div>;
    };

    const getDoc = list => {
        const items = list.map(item => {
            return createDiv(item);
        });
        return items;
    };
    return (
        <div>
            {getDoc(list)}
            {/* 两个元素 */}
            <div className="line">
                <div className="left">
                Duration 02h 35m
                </div>
                <div className="right">
                Transfer in CHK
                </div>
            </div>
            {/* 单个元素 */}
            <div className="test">
                {obj.name}
            </div>
        </div>
    );
};
export default hot(Test);
