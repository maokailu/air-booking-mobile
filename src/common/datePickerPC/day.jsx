import React from 'react';
import './style.scss';
import classNames from 'classnames';
export default class Day extends React.Component {
    constructor(props) {
        super(props);
    }
    clickHandler = index => {
        this.props.clickHandler(index);
    };
    render() {
        const day = this.props.day;
        let index = this.props.index;
        let sizeOfPrevShowDays = this.props.sizeOfPrevShowDays;
        let sizeOfCurrentMonth = this.props.sizeOfCurrentMonth;
        const sliderStart = this.props.sliderStart;
        const sliderEnd = this.props.sliderEnd;
        let tdStyle = classNames({
            fadeOut: index < sizeOfPrevShowDays || index >= sizeOfPrevShowDays + sizeOfCurrentMonth ||
            (this.props.disabledDate),
            td: true,
            slider: this.props.slider
        });
        return (
            <span onClick={() => this.clickHandler(index, event)} className={tdStyle}>
                {day}
                {((index === sliderEnd) && !this.props.disabledDate) &&
                    <span className="date">{day}
                    </span>}
                {(index === sliderStart) &&
                    <span className="date">{day}
                    </span>}
                {((this.props.isDepartDate || this.props.addSliderHalf) && index === sliderStart)
                    && <span className="sliderHalf sliderStart"/>
                }
                {(index === sliderEnd && !this.props.disabledDate) && <span className="sliderHalf sliderEnd"/>
                }
            </span>
        );
    }
}
