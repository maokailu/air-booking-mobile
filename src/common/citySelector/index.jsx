import React from 'react';
import './style.scss';
import utils from '../../resources/utils';
export default class CitySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recentCity: JSON.parse(localStorage.getItem('recentCity')) || [],
            hotCity: JSON.parse(localStorage.getItem('hotCity')) || [],
            jp: JSON.parse(localStorage.getItem('jp')) || [],
            us: JSON.parse(localStorage.getItem('us')) || [],
            current: this.props.cityCode,
            currentCityName: this.props.currentCityName,
            showResult: false
        };
    }
    componentDidMount() {
        this.state.hotCity.length === 0 && this.initGrid();
    }
    initGrid = () => {
        utils.getPromise('getHotDestinations', null).then(json => {
            json = JSON.parse(json);
            if (!utils.isEmpty(json)) {
                const hotCity = json['ZH'];
                const jp = json['JP'];
                const us = json['US'];
                this.setState({
                    hotCity: hotCity,
                    jp: jp,
                    us: us
                }, () => {
                    hotCity && localStorage.setItem('hotCity', JSON.stringify(hotCity));
                    jp && localStorage.setItem('jp', JSON.stringify(jp));
                    us && localStorage.setItem('us', JSON.stringify(us));
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
                this.changeCurrentCity(city);
                return;
            }
        }
        if (!hasCity) {
            recentCity.unshift(city);
            if (recentCity.length > 6) {
                recentCity.pop();
            }
        }
        this.changeCurrentCity(city, recentCity);
    }
    changeCurrentCity = (city, recentCity) => {
        this.setState((prevState)=>({
            current: city.cityCode,
            currentCityName: city.cityName,
            recentCity: recentCity ? recentCity : prevState.recentCity
        }), ()=>{
            this.props.changeCity(city);
            recentCity && localStorage.setItem('recentCity', JSON.stringify(recentCity));
            setTimeout(()=>{
                this.props.closeCitySelector();
            }, 300);
        });
    }
    searchGeo=event=>{
        if (event.target.value) {
            const param = `text=${event.target.value}`;
            utils.getPromise(`getCitys?${param}`).then(json => {
                console.log(json);
                this.setState({
                    result: json
                });
            }, error => {
                console.error('出错了', error);
            });
            this.setState({
                showResult: true
            });
        } else {
            this.setState({
                showResult: false
            });
        }
        this.setState({
            currentCityName: event.target.value
        });
    }
    selectPOICity = city =>{
        const selectedCity = {
            cityName: city.cityName,
            cityCode: city.cityCode
        };
        this.selectCity(selectedCity);
    }
    selectPOIAirport = (city, airport) =>{
        const selectedCity = {
            cityName: city.cityName,
            cityCode: city.cityCode,
            airportName: airport.airportName,
            airportCode: airport.airportCode
        };
        console.log(selectedCity);
        this.selectCity(selectedCity);
    }
    render() {
        return (
            <div className="city-selector">
                <div className="title">
                    <span className="close-btn icon-keyboard-return"
                        onClick = {() => this.props.closeCitySelector()}></span>
                    <span className="input-label">{this.props.labelText}</span>
                    <input type="text" value={this.state.currentCityName}
                        onChange={(event)=>this.searchGeo(event)} className="input-box" />
                </div>

                <div style={{ position: 'relative' }}>
                    <div>
                        <div className="section-title"><span className="label">最近搜寻</span>
                            <span className="line"></span></div>
                        <div className="section">
                            {
                                this.state.recentCity &&
                        this.state.recentCity.length !== 0 && this.state.recentCity.map((city, index) =>
                                    <div key={index}
                                        onClick={()=>this.selectCity(city)}
                                        className={ this.state.current === city.cityCode ? 'current' : ''}>
                                        {city.cityName}</div>
                                )
                            }
                        </div>
                        <div className="section-title"><span className="label">热门城市</span>
                            <span className="line"></span></div>
                        <div className="section">
                            {
                                this.state.hotCity
                                    && this.state.hotCity.length !== 0 && this.state.hotCity.map((city, index) =>
                                    <div key={index}
                                        onClick={()=>this.selectCity(city)}
                                        className={ this.state.current === city.cityCode ? 'current' : ''}>
                                        {city.cityName}</div>
                                )
                            }
                        </div>
                        <div className="section-title">
                            <span className="label">日本</span><span className="line"></span></div>
                        <div className="section">
                            {
                                this.state.jp && this.state.jp.length !== 0 && this.state.jp.map((city, index) =>
                                    <div key={index}
                                        onClick={()=>this.selectCity(city)}
                                        className={ this.state.current === city.cityCode ? 'current' : ''}>
                                        {city.cityName}</div>
                                )
                            }
                        </div>
                        <div className="section-title"><span className="label">美国</span>
                            <span className="line"></span></div>
                        <div className="section">
                            {
                                this.state.us && this.state.us.length !== 0 && this.state.us.map((city, index) =>
                                    <div key={index}
                                        onClick={()=>this.selectCity(city)}
                                        className={ this.state.current === city.cityCode ? 'current' : ''}>
                                        {city.cityName}</div>
                                )
                            }
                        </div>
                    </div>
                    {this.state.showResult && <div className="searchResult">
                        {
                            this.state.result &&
                            this.state.result.length !== 0 && this.state.result.map((city, index) =>
                                <div key={index}>
                                    <div className="city" onClick={()=>this.selectPOICity(city)}>
                                        {city.cityCode + ' ' + city.cityName}</div>
                                    {city.airports.map((airport, index) =>
                                        <div className="airport" onClick={()=>this.selectPOIAirport(city, airport)}
                                            key={index}>{airport.airportCode + ' ' + airport.airportName}</div>
                                    )}
                                </div>
                            )
                        }
                    </div>}
                </div>
            </div>
        );
    }
}
