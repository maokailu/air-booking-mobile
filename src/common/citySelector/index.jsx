import React from 'react';
import './style.scss';
import utils from '../../resources/utils';
export default class CitySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recentCity: JSON.parse(localStorage.getItem('recentCity')) || [],
            hotCity: JSON.parse(localStorage.getItem('hotCity')) || [],
            us: JSON.parse(localStorage.getItem('us')) || [],
            others: JSON.parse(localStorage.getItem('others')) || [],
            current: this.props.cityCode,
            currentCityName: this.props.currentCityName
        };
    }
    componentDidMount() {
        this.state.hotCity.length === 0 && this.initGrid();
    }
    initGrid = () => {
        // const params = { cityCode: 'HKG' };
        utils.getPromise('http://localhost:8080/getHotDestinations', null).then(json => {
            json = JSON.parse(json);
            if (Object.keys(json).length) {
                const china = json['China'];
                const us = json['United States'];
                const others = json['Others'];
                this.setState({
                    hotCity: china,
                    us: us,
                    others: others
                }, () => {
                    china && localStorage.setItem('hotCity', JSON.stringify(china));
                    us && localStorage.setItem('us', JSON.stringify(us));
                    others && localStorage.setItem('others', JSON.stringify(others));
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
                return;
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
                        this.state.hotCity && this.state.hotCity.length !== 0 && this.state.hotCity.map((city, index) =>
                            <div key={index}
                                onClick={()=>this.selectCity(city)}
                                className={ this.state.current === city.cityCode ? 'current' : ''}>{city.cityName}</div>
                        )
                    }
                </div>
                <div className="section-title"><span className="label">美国</span><span className="line"></span></div>
                <div className="section">
                    {
                        this.state.us && this.state.us.length !== 0 && this.state.us.map((city, index) =>
                            <div key={index}
                                onClick={()=>this.selectCity(city)}
                                className={ this.state.current === city.cityCode ? 'current' : ''}>{city.cityName}</div>
                        )
                    }
                </div>
                <div className="section-title"><span className="label">其他</span><span className="line"></span></div>
                <div className="section">
                    {
                        this.state.others && this.state.others.length !== 0 && this.state.others.map((city, index) =>
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
