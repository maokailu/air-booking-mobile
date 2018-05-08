import React from 'react';
import './style.scss';
import utils from '../../resources/utils';
export default class CitySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recentCity: JSON.parse(localStorage.getItem('recentCity')) || [],
            hotCity: JSON.parse(localStorage.getItem('hotCity')) || [],
            others: JSON.parse(localStorage.getItem('others')) || [],
            current: this.props.cityCode,
            currentCityName: this.props.currentCityName
        };
    }
    componentDidMount() {
        this.state.hotCity.length === 0 && this.initGrid();
    }
    initGrid = () => {
        const params = { departCityCode: 'HKG' };
        utils.getPromise('http://localhost:8080/getHotDestinations', params).then(json => {
            json = JSON.parse(json);
            if (json) {
                this.setState({
                    hotCity: json['china'],
                    others: json['United States']
                }, () => {
                    localStorage.setItem('hotCity', JSON.stringify(json['china']));
                    localStorage.setItem('others', JSON.stringify(json['United States']));
                });
            }
        }, error => {
            console.error('出错了', error);
        });
    }
    selectCity = city => {
        let hasCity = false;
        const recentCity = this.state.recentCity;
        for (let i = 0;i < recentCity.length;i++) {
            if (recentCity[i].cityCode === city.cityCode) {
                hasCity = true;
            }
        }
        if (!hasCity) {
            recentCity.unshift(city);
            if (recentCity.length > 6) {
                recentCity.pop();
            }
        }
        this.setState({
            current: city.cityCode,
            currentCityName: city.cityName,
            recentCity: recentCity
        }, ()=>{
            this.props.changeCity(city);
            localStorage.setItem('recentCity', JSON.stringify(recentCity));
            setTimeout(()=>{
                this.props.closeCitySelector();
            }, 300);
        });
    }
    render() {
        return (
            <div className="city-selector">
                <div className="title">
                    <span className="close-btn" onClick = {() => this.props.closeCitySelector()}>arrow</span>
                    <span className="input-label">{this.props.labelText}</span>
                    <span className="input-box">{this.state.currentCityName}</span>
                </div>
                <div className="section-title"><span className="label">最近搜寻</span><span className="line"></span></div>
                <div className="section">
                    {
                        this.state.recentCity.map((city, index) =>
                            <div key={index}
                                onClick={()=>this.selectCity(city)}
                                className={ this.state.current === city.cityCode ? 'current' : ''}>{city.cityName}</div>
                        )
                    }
                </div>
                <div className="section-title"><span className="label">热门城市</span><span className="line"></span></div>
                <div className="section">
                    {
                        this.state.hotCity.map((city, index) =>
                            <div key={index}
                                onClick={()=>this.selectCity(city)}
                                className={ this.state.current === city.cityCode ? 'current' : ''}>{city.cityName}</div>
                        )
                    }
                </div>
                <div className="section-title"><span className="label">其他</span><span className="line"></span></div>
                <div className="section">
                    {
                        this.state.others.map((city, index) =>
                            <div key={index}
                                onClick={()=>this.selectCity(city)}
                                className={ this.state.current === city.cityCode ? 'current' : ''}>{city.cityName}</div>
                        )
                    }
                </div>
            </div>
        );
    }
}
