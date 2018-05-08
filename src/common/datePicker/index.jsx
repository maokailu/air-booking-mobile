import React from 'react';
import Day from './day';
import SelectOption from './selectOption';
import DateUtil from '../../resources/date';
import './style.scss';
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let week = date.getDate();
let count = 0;
let fromIndex = -1;
let toIndex = -1;
let addSliderHalf = false;
let disabledDate = false;
export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentyear: year,
            currentmonth: month,
            currentIndex: this.getFirstDay(month, year) + week - 1
        };
    }

    componentDidMount() {
        date = new Date();
        DateUtil.isLeapYear(date);
    }
    selectYear = event => {
        let value = parseInt(event.target.value);
        this.setState(prevState => ({
            currentyear: value,
            currentIndex:
                this.getFirstDay(prevState.currentmonth, value) +
                prevState.currentIndex -
                this.getFirstDay(prevState.currentmonth, prevState.currentyear)
        }));
    };
    selectMonth = event => {
        let value = parseInt(event.target.value);
        this.setState(prevState => {
            return {
                currentmonth: value,
                currentIndex:
                    this.getFirstDay(value, prevState.currentyear) +
                    prevState.currentIndex -
                    this.getFirstDay(prevState.currentmonth, prevState.currentyear)
            };
        });
    };
    getSizeOfMonth = (year, month) => {
        let sizeOfMonths = [31, 28, 31, 30, 31, 30, 31, 30, 31, 31, 30, 31];
        if (year % 100 === 0 && year % 400 === 0) {
            sizeOfMonths[1]++;
        }
        let sizeOfMonth = sizeOfMonths[month];
        return sizeOfMonth;
    };
    getFirstDay = (month, year) => {
        let timestamp = Date.parse(month + 1 + '/1/' + year);
        let date = new Date(timestamp);
        let firstDay = date.getDay();
        return firstDay;
    };
    getTable = () => {
        let sizeOfPrevMonth;
        if (this.state.currentmonth === 0) {
            sizeOfPrevMonth = this.getSizeOfMonth(this.state.currentyear - 1, 11);
        } else {
            sizeOfPrevMonth = this.getSizeOfMonth(this.state.currentyear, this.state.currentmonth - 1);
        }
        let sizeOfCurrentMonth = this.getSizeOfMonth(this.state.currentyear, this.state.currentmonth);
        let firstDay = this.getFirstDay(this.state.currentmonth, this.state.currentyear);
        let days = [];
        for (let i = sizeOfPrevMonth - firstDay + 1; i <= sizeOfPrevMonth; i++) {
            days.push(i);
        }
        for (let j = 1; j <= sizeOfCurrentMonth; j++) {
            days.push(j);
        }
        if (this.state.currentmonth !== 11 || this.state.currentyear !== year) {
            for (let k = 1; k <= 42 - sizeOfCurrentMonth - firstDay; k++) {
                days.push(k);
            }
        }
        let table = [];
        new Array(6).fill(0).forEach((row, rowIndex) => {
            table.push(days.slice(rowIndex * 7, (rowIndex + 1) * 7));
        });
        return table;
    };
    // 点击相邻月日期时，跳到相邻月的相应日期：
    // （前月天数31-点击格子Index2）（即实际点击上月号数）+前月1号天数即前前月占用天数，生成上月布局并跳到指定号数
    // 关键在计算点击前月时的Index时要加上前前月在前月占用的天数

    clickHandler = index => {
        let currentmonth = this.state.currentmonth;
        let currentyear = this.state.currentyear;
        let firstDayOfCurrentMonth = this.getFirstDay(currentmonth, currentyear);
        let prevmonth = 0;
        let nextmonth = 0;
        prevmonth = currentmonth === 0 ? 11 : currentmonth - 1;
        nextmonth = currentmonth === 11 ? 0 : currentmonth + 1;
        let firstDayOfPrevMonth = this.getFirstDay(prevmonth, currentyear);
        let firstDayOfNextMonth = this.getFirstDay(nextmonth, currentyear);
        let sizeOfCurrentMonth = this.getSizeOfMonth(currentyear, currentmonth);
        let sizeOfPrevMonth = this.getSizeOfMonth(currentyear, prevmonth);
        this.setState({
            currentIndex: index
        });
        if (index < firstDayOfCurrentMonth) {
            this.setState(prevState => {
                return {
                    currentmonth: prevmonth,
                    currentyear: prevState.currentmonth === 0 ? prevState.currentyear - 1 : prevState.currentyear,
                    currentIndex: index + sizeOfPrevMonth - firstDayOfCurrentMonth + firstDayOfPrevMonth
                };
            });
        } else if (index >= firstDayOfCurrentMonth + sizeOfCurrentMonth) {
            this.setState(prevState => ({
                currentmonth: nextmonth,
                currentyear: prevState.currentmonth === 11 ? prevState.currentyear + 1 : prevState.currentyear,
                currentIndex: index - firstDayOfCurrentMonth - sizeOfCurrentMonth + firstDayOfNextMonth
            }));
        }
        count++;
        const shortMonthNames =
        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (this.props.isDepartDate) {
            let isDepartDate;
            if (count === 1) {
                // debugger
                if (index < fromIndex || (index > fromIndex && index < toIndex)) {
                    addSliderHalf = true;
                }
                if (toIndex !== -1 && index > toIndex) {
                    // disabledDate = true;
                    // addSliderHalf = false;
                }
                fromIndex = index;
                isDepartDate = true;
            } else if (count === 2) {
                // disabledDate = false;

                toIndex = index;
                isDepartDate = false;
                setTimeout(()=>{
                    this.props.closeDatePicker();
                }, 300);
                count = 0;
            }
            this.props.selectDate(isDepartDate, shortMonthNames[currentmonth], index - firstDayOfCurrentMonth + 1);
        } else {
            toIndex = index;
            let isDepartDate = false;
            this.props.selectDate(isDepartDate, shortMonthNames[currentmonth], index - firstDayOfCurrentMonth + 1);

            setTimeout(()=>{
                this.props.closeDatePicker();
            }, 300);
            count = 0;
        }
    };

    render() {
        console.log(count);
        let firstDay = this.getFirstDay(this.state.currentmonth, this.state.currentyear);
        let sizeOfCurrentMonth = this.getSizeOfMonth(this.state.currentyear, this.state.currentmonth);
        return (
            <div className="datePicker">
                <div className="fullcalender-header">
                    <select value={this.state.currentyear} onChange={this.selectYear}>
                        {new Array(5)
                            .fill(new Date().getFullYear())
                            .map((year, index) => (
                                <SelectOption value={year - index} text={year - index} key={index} />
                            ))};
                    </select>
                    <select value={this.state.currentmonth} onChange={this.selectMonth}>
                        {new Array(12)
                            .fill(new Date().getMonth())
                            .map((month, index) => <SelectOption value={index} text={index + 1} key={index} />)};
                    </select>
                </div>
                <div className="grid">
                    <span className="th">周日</span>
                    <span className="th">周一</span>
                    <span className="th">周二</span>
                    <span className="th">周三</span>
                    <span className="th">周四</span>
                    <span className="th">周五</span>
                    <span className="th">周六</span>
                    {this.getTable().map((row, rowIndex) => (
                        row.map((day, columnIndex) => (
                            <Day
                                key={rowIndex * 7 + columnIndex}
                                index={rowIndex * 7 + columnIndex}
                                sizeOfPrevShowDays={firstDay}
                                sizeOfCurrentMonth={sizeOfCurrentMonth}
                                day={day}
                                clickHandler={() => this.clickHandler(rowIndex * 7 + columnIndex, event)}
                                currentIndex={this.state.currentIndex}
                                isDepartDate = {count === 0}
                                sliderStart = {fromIndex}
                                sliderEnd = {toIndex}
                                addSliderHalf = {addSliderHalf}
                                disabledDate = {(rowIndex * 7 + columnIndex < fromIndex)}
                                slider = {
                                    (rowIndex * 7 + columnIndex > fromIndex && rowIndex * 7 + columnIndex < toIndex) ?
                                        'slider' : ''
                                }
                            />
                        ))
                    ))}
                </div>
            </div>
        );
    }
}
