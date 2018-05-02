import React from 'react';
import './style.scss';
import utils from '../../resources/utils';
export default class CitySelecter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recentCity: [
                // { cityName: '上海', cityCode: 'SHA' },
                // { cityName: '北京', cityCode: 'PEK'  },
                // { cityName: '香港', cityCode: 'HKG' },
                // { cityName: '深圳', cityCode: 'SZX' }
            ],
            hotCity: localStorage.getItem('hotCity') && [
                // { cityName: '上海', cityCode: 'SHA' },
                // { cityName: '北京', cityCode: 'PEK' },
                // { cityName: '香港', cityCode: 'HKG' },
                // { cityName: '深圳', cityCode: 'SZX' }
            ],
            others: localStorage.getItem('others') && [
                // { cityName: '东京', cityCode: 'DJX' }, { cityName: '悉尼', cityCode: 'XNX' }
            ],
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
                    localStorage.setItem('hotCity', json['china']);
                    localStorage.setItem('others', json['United States']);
                });
            }
        }, error => {
            console.error('出错了', error);
        });
    }
    selectCity = city => {
        this.setState({
            current: city.cityCode,
            currentCityName: city.cityName
        }, ()=>{
            this.props.selectCity(city);
            setTimeout(()=>{
                this.props.closeCitySelecter();
            }, 300);
        });
    }
    render() {
        return (
            <div className="city-selecter">
                <div className="title">
                    <span className="close-btn" onClick = {() => this.props.closeCitySelecter()}>arrow</span>
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
