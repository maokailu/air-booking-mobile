import { hot } from 'react-hot-loader/root';
import React, { useMemo } from 'react';
// import '../assets/text.html';
import './test.scss';


const Test = () => {
    // 原始json数组
    const originList = [
        {
            'objectID': '0',
            'name': '',
            // 样式信息
            'css': ['font-family: Helvetica;', 'font-size: 24px;', 'background: #ccc;', 'line-height: 30px;'],
            // 布局信息
            'rect': {
                x: '0px',
                y: '10.5px',
                width: '375px',
                height: '100px'
            }
        },
        {
            'objectID': '3885A677-2682-4F5F-A7FC-C3C917128A42',
            'type': 'text',
            'name': 'PVG T1 Copy 3',
            // 样式信息
            'css': ['font-family: Helvetica;', 'font-size: 24px;', 'color: #999999;', 'line-height: 30px;'],
            // 布局信息
            'rect': {
                x: '13px',
                y: '10.5px',
                width: '90px',
                height: '15px'
            }
        }, {
            'objectID': 'C5F3941E-B852-44E8-AF7E-F75D1E643E57',
            'type': 'text',
            'name': 'JFK T2 Copy 3',
            'css': ['font-family: Helvetica;', 'font-size: 24px;', 'color: #999999;', 'line-height: 30px;'],
            'rect': {
                x: '100.5px',
                y: '10.5px',
                width: '135px',
                height: '15px'
            }
        }, {
            'objectID': '1A75040C-B388-4BEB-988D-5E62AE384E42',
            'type': 'text',
            'name': 'Duration 02h 35m Copy 3',
            'css': ['font-family: SFProDisplay-Regular;', 'font-size: 24px;', 'color: black;', 'line-height: 30px;'],
            'rect': {
                x: '12px',
                y: '89.5px',
                width: '92px',
                height: '15px'
            }
        }
    ];
    // 生成有序数组
    // [[ { id: 1, rect: {}, css: {} }, {} ], []];
    const list = [];
    originList.map(item => {
        const { x, y } = item.rect;

        // 找到当前元素所在的行
        let row = list.find(row => row[0].rect.y === y);
        if (!row) {
            row = [item];
            const firstRowY = list[0] && list[0][0].rect.y;
            (y < firstRowY) ? list.unshift(row) : list.push(row);
        } else {
            const firstRowY = row[0] && row[0].rect.x;
            (x < firstRowY) ? row.unshift(item) : row.push(item);
        }
    });

    const handler = {
        get: (obj, prop) => {
            if (typeof obj[prop] === 'object') {
                return new Proxy(obj[prop], handler);
            } else if (prop === 'y' || prop === 'x' || prop === 'height') {
                return obj[prop].replace(/(\d*)px/, (str, $1) => $1);
            }
        }
    };
    // 生成每个div
    const createDiv = (item, index, rowIndex, list) =>{
        const formatcss = {};
        item.css.forEach(item => {
            let [key, value] = item.split(':');
            // js不支持\u转大写，只能手动拼了
            const formatKey = key.replace(/(\w*)-(\w)(\w*)/, (str, $1, $2, $3) => $1 + $2.toUpperCase() + $3);
            let formatValue = value.replace(/;/, '');
            formatValue = formatValue.replace(/(\d*)(px)/, (str, $1, $2) => $1 / 2 + $2);
            formatcss[formatKey] = formatValue;
        });
        formatcss.display = 'inline-block';
        formatcss.width = item.rect.width;
        formatcss.height = item.rect.height;

        // 值修正
        const proxy = new Proxy(item, handler);
        const listProxy = new Proxy(list, handler);
        formatcss.marginTop = rowIndex !== 0 ? `${proxy.rect.y - listProxy[rowIndex - 1][0].rect.y}px` : `${proxy.rect.y}px`;
        formatcss.marginLeft =  index !== 0 ? `${proxy.rect.x - listProxy[rowIndex][index - 1].rect.x}px` : `${proxy.rect.x}px`;
        console.log(formatcss);
        return <span key={item.objectID} style={formatcss} className={`s${item.objectID}`}>
            {item.name}</span>;
    };

    // 生成dom tree
    const getDom = list => {
        const dom = [];
        list.map((row, rowIndex) => {
            const listProxy = new Proxy(list, handler);
            const proxy = new Proxy(row, handler);

            const prevTop = rowIndex !== 0 ?
                listProxy[rowIndex - 1][0].rect.y + listProxy[rowIndex - 1][0].rect.height : listProxy[0][0].rect.y;
            const top =  proxy[0].rect.y + proxy[0].rect.height;
            console.log(proxy[0].rect.y, proxy[0].rect.height);
            const rowDiv =
                <div key={rowIndex}>
                    {row.map((item, index) =>
                        createDiv(item, index, rowIndex, list)
                    )}
                </div>;
            if (top < prevTop) {
                dom[rowIndex - 1].push(rowDiv);
            } else {
                dom.push(rowDiv);
            }
        });
        return dom;
    };
    const info = [1, 2, 3];
    console.log(data);
    const shadowEqual = (a, b) => {
        if (Object.is(a, b)) return true;
        for (let prop in a) {
            if (!a.hasOwnProperty(prop)) break;
            if (a[prop] !== b[prop]) {
                return false;
            }
        }
        return true;
    };
    const memorize = (fn, args) => {
        let value = null;
        let mArgs = args;
        // 某个依赖项改变才调用fn
        if (shadowEqual(args, mArgs)) {
            console.log('do');
            value = fn.apply(this, args);
            mArgs = args;
        }
        return value;
    };
    const data = memorize(() => info.map(item => item + 1), [info]);
    return (
        getDom(list)
    );
};
export default hot(Test);
