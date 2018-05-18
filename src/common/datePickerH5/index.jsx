import React from 'react';
import './style.scss';
const shortMonthNamesEn= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const shortMonthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
let selectCount = 0;
export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            current: -1,
            start: -1,
            end: -1,
            departDateStr: this.props.departDateStr,
            returnDateStr: this.props.returnDateStr
        };
    }

    componentDidMount() {
        this.initGrid();
    }
    initGrid = () => {
        const date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        const grid = [];
        let count = 0;
        while (count < 12) {
            const days = [];
            const firstDay = new Date(year, month, 1);
            const start = firstDay.getDay();
            const end = new Date(year, month + 1, 0).getDate();
            for (let i = 1; i <= start; i++) {
                days.push(0);
            }
            for (let i = start; i <= end + start - 1; i++) {
                days.push(i - start + 1);
            }
            if (month < 12) {
                month++;
            } else {
                month = 1;
                year++;
            }
            const shortMonthName = shortMonthNames[month - 1];
            const obj = {};
            // obj.title = year + '年' + shortMonthName;
            obj.year = year;
            obj.month = month;
            obj.days = days;
            obj.shortMonthName = shortMonthName;
            grid.push(obj);
            count++;
        }
        this.setState({
            grid: grid
        });
        console.log(grid);
    }
    getDays = () => {
        const date = new Date();
        const days = [];
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const end = new Date(year, month, 0).getDate();
        const firstDay = new Date(year, month, 1);
        const start = firstDay.getDay();
        console.log(year, month, start);
        for (let i = 1; i <= start; i++) {
            days.push(0);
        }
        for (let i = start; i <= end + start - 1; i++) {
            days.push(i - start + 1);
        }
        this.setState({
            days: days
        });
        console.log(days);
        return days;
    }
    clickDate = (year, month, day, index) =>{
        selectCount++;
        console.log(year, month, day, index);
        const shortMonthName = shortMonthNames[month];
        const dateStr = `${shortMonthName}${day}日`;
        // this.setState({
        //     current: index
        // });
        const date = new Date(year, month, day);
        this.props.selectDate(shortMonthName, day, dateStr, date);
        if (this.props.isDepartDate) {
            if (selectCount === 1) {
                this.setState({
                    departDateStr: dateStr,
                    start: index
                });
                localStorage.setItem('departDateStr', dateStr);
            } else if (selectCount === 2) {
                this.setState({
                    returnDateStr: dateStr,
                    end: index
                });
                localStorage.setItem('returnDateStr', dateStr);
                setTimeout(()=>{
                    this.props.closeDatePicker();
                }, 500);
                selectCount = 0;
            }
        } else {
            this.setState({
                returnDateStr: dateStr
            });
            localStorage.setItem('returnDateStr', dateStr);
            setTimeout(()=>{
                this.props.closeDatePicker();
            }, 500);
            selectCount = 0;
        }
    }
    clickCancel = () => {
        
    }
    clickComfirm = () => {
        
    }
    render() {
        return (
            <div className="datePicker">
                <div className = "datePicker-header">
                    <span className="header-btn" onClick={()=>this.props.closeDatePicker()}>取消</span>
                    <span>选择日期</span>
                    <span className="header-btn" onClick={()=>this.props.closeDatePicker()}>确定</span>
                </div>
                <div className="grid">
                    <div className="input-box">
                        <div className="input-date">
                            <div>出发</div>
                            <div className={this.state.departDateStr ? 'blue' : 'gray'}>
                                {this.state.departDateStr || '日期' }</div>
                        </div>
                        <div className="input-date">
                            <div>到达</div>
                            <div className={this.state.returnDateStr ? 'blue' : 'gray'}>
                                {this.state.returnDateStr || '日期' }</div>
                        </div>
                    </div>
                    <div className="calender-title">
                        <span className="th">周日</span>
                        <span className="th">周一</span>
                        <span className="th">周二</span>
                        <span className="th">周三</span>
                        <span className="th">周四</span>
                        <span className="th">周五</span>
                        <span className="th">周六</span>
                    </div>
                    {
                        this.state.grid.map((obj, monthIndex) => (
                            <div key={monthIndex} className="month-box">
                                <div className="month">{obj.year + '年' + obj.shortMonthName}</div>
                                <div className="days">
                                    {obj.days.map((day, dayIndex) => (
                                        <div key={dayIndex}
                                            className={'day'
                                            // + (this.state.current === monthIndex * 100 + dayIndex ? ' current' : '')
                                            + (this.state.start === monthIndex * 100 + dayIndex ? ' current start' : '')
                                            + (this.state.end === monthIndex * 100 + dayIndex ? ' current end' : '')
                                            + ((this.state.start < monthIndex * 100 + dayIndex < this.state.end) ? ' slider' : '')
                                            }
                                            onClick={()=>this.clickDate(obj.year, obj.month, day, monthIndex * 100 + dayIndex)}>
                                            {day !== 0 && day}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}
