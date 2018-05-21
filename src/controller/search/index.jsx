import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import List from '../list';
import Detail from '../detail';
import Book from '../book';
import Login from '../login';
import utils from '../../resources/utils';
import Header from 'header';
import Footer from 'footer';
import Result from '../result';
import CitySelector from 'citySelector';
import DatePicker from '../../common/datePickerH5';
import Swiper from 'swiper';
import Account from '../header/account';
import Help from '../header/help';
import Order from '../header/orders';
let mySwiper;
class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            departCity: JSON.parse(localStorage.getItem('departCity')) || {},
            arriveCity: JSON.parse(localStorage.getItem('arriveCity')) || {},
            tripType: 1,
            showCitySelector: false,
            showDatePicker: false,
            isDepartCity: true,
            isDepartDate: true,
            departDate: localStorage.getItem('departDateStr') || '',
            returnDate: localStorage.getItem('returnDateStr') || '',
            departDateObj: new Date(JSON.parse(localStorage.getItem('departDateObj'))) || {},
            returnDateObj: new Date(JSON.parse(localStorage.getItem('returnDateObj'))) || {},
            passenger: 1,
            classType: ['头等舱', '商务舱', '经济舱'],
            start: localStorage.getItem('start') || -1,
            end: localStorage.getItem('end') || -1
        };
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    componentDidMount() {
        if (utils.isEmpty(this.state.departCity)) {
            this.getCurrentCityNum();
        }
        mySwiper = new Swiper('#swiper', {
            // autoplay: true,//可选选项，自动滑动
            direction: 'vertical',
            loop: true,
            speed: 100,
            delay: 0,
            autoHeight: true, // 高度随内容变化
            // simulateTouch : true,
            on: {
                click: ()=>{
                    mySwiper.slideNext();
                }
            }
        });
        
        console.log(this.state.departDateObj);
    }
    getCurrentCityNum = () => {
        // utils.getPromise('http://api.map.baidu.com/location/ip?ak=MTsoYO1kC64Gagtb9FdsXg2fbyyQvoTA').then(json => {
        //     if (json && json.content) {
        //         const city = json.content.address_detail;
        //         if (city) {
        //              const cityNum = city.city_code;
        //              this.initDepartCity(cityNum);
        //         }
        //     }
        // }, error => {
        //     console.error('出错了', error);
        // });
        this.initDepartCity();
    }
    initDepartCity = cityNum => {
        if (!cityNum) cityNum = 316;
        const params = `cityNum=${cityNum}`;
        utils.getPromise(`http://localhost:8080/getCurrentCityByCityNum?${params}`).then(json => {
            if (json) {
                this.setState({
                    departCity: json
                }, () => {
                    localStorage.setItem('departCity', JSON.stringify(json));
                });
            }
        }, error => {
            console.error('出错了', error);
        });
    }
    clickDepartCity = () => {
        this.setState({
            showCitySelector: true,
            isDepartCity: true
        });
    }
    clickArriveCity = () => {
        this.setState({
            showCitySelector: true,
            isDepartCity: false
        });
    }
    changeCity = city => {
        if  (this.state.isDepartCity) {
            this.setState({
                departCity: city
            });
            localStorage.setItem('departCity', JSON.stringify(city));
        } else {
            this.setState({
                arriveCity: city
            });
            localStorage.setItem('arriveCity', JSON.stringify(city));
        }
    }
    clickDepartDate = () => {
        this.setState({
            showDatePicker: true,
            isDepartDate: true
        });
    }
    clickReturnDate = () => {
        this.setState({
            showDatePicker: true,
            isDepartDate: false
        });
    }
    selectDate = (isDepartDate, month, day, departDateStr, date, start, end) => {
        console.log(start, end);
        if (isDepartDate) {
            this.setState({
                departDate: departDateStr,
                departDateObj: date
            });
            localStorage.setItem('departDateObj', JSON.stringify(date));
        } else {
            this.setState({
                returnDate: departDateStr,
                returnDateObj: date
            });
            localStorage.setItem('returnDateObj', JSON.stringify(date));
        }
    }
    closeDatePicker = () => {
        this.setState({
            showDatePicker: false
        });
    }
    search = () => {
        // debugger
        const departCity = this.state.departCity;
        const arriveCity = this.state.arriveCity;
        const departCityName = departCity.cityName;
        const arriveCityName = arriveCity.cityName;
        const departCityCode = departCity.cityCode;
        const arriveCityCode = arriveCity.cityCode;
        const departAirportCode = departCity.departCode || 'ALL';
        const arriveAirportCode = arriveCity.arriveCode || 'ALL';
        const departDate = this.state.departDateObj.getTime();
        const returnDate = this.state.returnDateObj.getTime();
        const classType = mySwiper.realIndex;
        const passenger = this.state.passenger;
        const tripType = this.state.tripType;
        if (this.state.departCity) {
            const query = `departCityName=${departCityName}&arriveCityName=${arriveCityName}`
            + `&departCityCode=${departCityCode}&arriveCityCode=${arriveCityCode}`
            + `&departAirportCode=${departAirportCode}&arriveAirportCode=${arriveAirportCode}`
            + `&departDate=${departDate}&returnDate=${returnDate}`
            + `&classType=${classType}&passenger=${passenger}`
            + `&tripType=${tripType}`;
            const path = {
                pathname: `/list`,
                search: query
            };
            this.context.router.history.push(path);
        } else {
            console.log('please input departCity');
        }
    }
    expandHeader = () => {
        this.setState(prevState => ({ showHeaderMenu: !prevState.showHeaderMenu }));
        const path = {
            pathname: '/login'
        };
        this.context.router.history.push(path);
    }
    toggleTripType = () => {
        this.setState(prevState => ({
            tripType: prevState.tripType === 0 ? 1 : 0
        }));
    }
    closeCitySelector = () => {
        this.setState({
            showCitySelector: false
        });
    }
    minus = () =>{
        if (this.state.passenger === 1) {
            return;
        }
        this.setState(prevState => ({
            passenger: prevState.passenger - 1
        }));
    }
    plus = () =>{
        if (this.state.passenger === 9) {
            return;
        }
        this.setState(prevState => ({
            passenger: prevState.passenger + 1
        }));
    }    
    clickOrders = () =>{
        const path = {
            pathname: `/orders`
        };
        this.context.router.history.push(path);
    }
    render() {
        const tripType = this.state.tripType;
        return (
            <div className="search">
                <Header isHome />
                <div className="category">
                    {/* <span>酒店</span> */}
                    {/* <span className="tab-flights">机票</span> */}
                    {/* <span>火车</span> */}
                </div>
                <div className="search-box">
                    <div className="tab" onClick={this.toggleTripType}>
                        <i className={'toggle-bar ' + (tripType === 0 ? 'left-tab' : 'right-tab')}/>
                        <div className="round_trip"
                            style={ tripType === 0 ? { color: '#fff' } : { color: '#2681FF' }}>往返</div>
                        <div className="one_way"
                            style={ tripType === 0 ? { color: '#2681FF' } : { color: '#fff' }}>单程</div>
                    </div>
                    <div className="box" onClick={this.clickDepartCity}>
                        <span className="tit">出发</span>
                        <div className={'content' + (this.state.departCity.cityName ? '' : ' gray')}>
                            {this.state.departCity.cityName || '城市或机场'}</div>
                        <span className="code">所有机场</span>
                    </div>
                    <div className="box" onClick={this.clickArriveCity}>
                        <span className="tit">到达</span>
                        <div className={'content' + (this.state.arriveCity.cityName ? '' : ' gray')}>
                            {this.state.arriveCity.cityName || '城市或机场'}</div>
                        <span className="code">所有机场</span>
                    </div>

                    <div className="box hascolumn">
                        <div onClick={this.clickDepartDate}>
                            <div className="tit">出发</div>
                            <span className={'content' + (this.state.departDate ? '' : ' gray')}>
                                {this.state.departDate || '日期'}</span>
                            <span className = "week">今天</span>
                        </div>
                        <div onClick={this.clickReturnDate}>
                            <div className="tit rdate">到达</div>
                            <span className={'content' + (this.state.returnDate ? '' : ' gray')}>
                                {this.state.returnDate || '日期'}</span>
                            <span className = "week">今天</span>
                        </div>
                    </div>

                    <div className="box hascolumn clearline">
                        <div className="class">
                            <div className="tit">舱位</div>
                            <div className="content">
                                <div className="swiper-container" id="swiper">
                                    <div className="swiper-wrapper wrapper" >
                                        {this.state.classType.map((classType, index) =>
                                            <div key={index} className="swiper-slide slide">{classType}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="passenger">
                            <div className="tit">乘客人数</div>
                            <span className={'icon-minus minus' + (this.state.passenger <= 1 ? ' gray' : ' blue')} onClick={this.minus}></span>
                            <span className="content number">{this.state.passenger}</span>
                            <span className={'icon-plus plus' + (this.state.passenger >= 9 ? ' gray' : ' blue')} onClick={this.plus}></span>
                        </div>
                    </div>
                    <div className="search-btn" onClick = {this.search}>查询</div>
                </div>
                <div className="footer-menu">
                    {/* <div className="left">
                        <i className="icon-status"/>
                        <span>Flight Status</span>
                    </div> */}
                    <div className="right">
                        <i className="icon-bookings"/>
                        <span onClick={this.clickOrders}>My Bookings</span>
                    </div>
                </div>
                <Footer />
                {this.state.showCitySelector &&
                <CitySelector
                    cityCode = {
                        this.state.isDepartCity ? this.state.departCity.cityCode : this.state.arriveCity.cityCode
                    }
                    closeCitySelector = {this.closeCitySelector} changeCity={this.changeCity}
                    currentCityName = {this.state.isDepartCity ?
                        this.state.departCity.cityName : this.state.arriveCity.cityName}
                    labelText = {this.state.isDepartCity ? '出发城市' : '到达城市'}
                />}
                {this.state.showDatePicker &&
                <DatePicker closeDatePicker={this.closeDatePicker}
                    selectDate = {this.selectDate}
                    isDepartDate = {this.state.isDepartDate}
                    departDateStr = {this.state.departDate}
                    returnDateStr = {this.state.returnDate}
                />}
            </div>
        );
    }
}
const Home = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/list" component={List} />
            <Route path="/detail" component={Detail} />
            <Route path="/book" component={Book} />
            <Route path="/login" component={Login} />
            <Route path="/result" component={Result} />
            <Route path="/account" component={Account} />
            <Route path="/help" component={Help} />
            <Route path="/orders" component={Order} />
        </Switch>
    </Router>
);

export default Home
;
