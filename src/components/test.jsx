import { hot } from 'react-hot-loader/root';
import React from 'react';
// import '../assets/text.html';
import './test.scss';


const Test = () => {
    const html = {
        '3885A677-2682-4F5F-A7FC-C3C917128A42': {
            left: '13px',
            top: '370.5px',
            width: '40px',
            height: '15px'
        },
        'C5F3941E-B852-44E8-AF7E-F75D1E643E57': {
            left: '147.5px',
            top: '370.5px',
            width: '35px',
            height: '15px'
        },
        '1A75040C-B388-4BEB-988D-5E62AE384E42': {
            left: '12px',
            top: '389.5px',
            width: '92px',
            height: '15px'
        }
    };
    // 原始json数组
    const originList = [
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
    // 生成有序数组
    const formatList = [];  // [[top, [{item}, {item}]], [top, []]];
    originList.map(item => {
        // 根据id获取元素位置信息
        const { left, top, width, height } = html[item.objectID] || document.querySelector(`.layer-${item.objectID}`).style;
        item.position = { left, top, width, height };

        let row = formatList.find(row => row[0] && row[0] === top);
        if (!row) {
            row = [top, [item]];
            const firstTop = formatList[0] && formatList[0][0];
            (top < firstTop) ? formatList.unshift(row) : formatList.push(row);
        } else {
            const rowEles = row[1];
            const firstItem = rowEles[0];
            (left < firstItem.left) ? rowEles.unshift(firstItem) : rowEles.push(firstItem);
        }
    });

    // 生成每个div
    const createDiv = item =>{
        const css = item.css;
        const obj = {};
        const formatcss = css.forEach(item => {
            // const a = item.replace(':', '": "');
            let [key, value] = item.split(':');
            // eslint-disable-next-line no-useless-escape
            // value.replace(/((*)(-)(*))/g, '$1\U$2\E$3');
            obj[[key]] = value;
        });
        formatcss && (formatcss.display = 'inlineBlock');
        return <div key={item.objectID} style={formatcss} className={`s${item.objectID}`}>
            {item.name}</div>;
    };

    // 生成每行div
    const createRowDiv = row => {
        // 当前行的元素信息集合
        const rowEles = row[1];
        // 生成当前行divs
        const rowDivs = rowEles.map(item => {
            return createDiv(item);
        });
        const rowbox = <div>{rowDivs}</div>;
        return rowbox;
    };

    // 遍历formatList生成jsx
    const getJsx = list => {
        const items = list.map(row => {
            return createRowDiv(row);
        });
        return items;
    };
    console.log(getJsx(formatList));
    return (
        <div>
            {getJsx(formatList)}
        </div>
    );
};
export default hot(Test);
