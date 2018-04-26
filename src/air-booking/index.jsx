import React from 'react';
import './search.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import List from './list';
import Detail from './detail';
import Book from './book';
import utils from '../resources/utils';
class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            departCity: {},
            arriveCity: {}
        };
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    componentDidMount() {
        this.initDepartCity();
    }
    initDepartCity = () => {
        utils.getPromise('http://localhost:8080/getLocationFlight').then(json => {
            json = JSON.parse(json);
            if (json.city) {
                this.setState({
                    departCity: json.city
                });
            }
        }, error => {
            console.error('出错了', error);
        });
    }
    selectDepartCity = () => {
        this.setState({
        });
    }
    search = () => {
        if (this.state.departCity) {
            const path = {
                pathname: '/list',
                departCityCode: this.state.departCity.flightId
            };
            this.context.router.history.push(path);
        } else {
            console.log('please input departCity');
        }
    }
    render() {
        const arrow = classNames({
            'arrow': true,
            'icon-arrow-up': this.state.showHeaderMenu,
            'icon-arrow-down': !this.state.showHeaderMenu
        });
        return (
            <div>
                <div className="head">
                    <i className="logo"></i>
                    <i className={arrow}
                        onClick={() => this.setState(prevState => ({ showHeaderMenu: !prevState.showHeaderMenu }))}>
                    </i>
                </div>
                <div className="category">
                    <span>Hotels</span>
                    <span>Flights</span>
                    <span>Trains</span>
                </div>
                <div className="search-box">
                    <div className="tab">
                        <div className="round_trip">Round Trip</div>
                        <div className="one_way">One-Way</div>
                    </div>
                    <div className="box" onClick={this.selectDepartCity}>
                        <span className="tit">From</span>
                        <div className="content">{this.state.departCity.name}</div>
                        <span className="code">All Airports</span>
                    </div>
                    <div className="box">
                        <span className="tit">From</span>
                        <div className="content">Shanghai</div>
                        <span className="code">All Airports</span>
                    </div>

                    <div className="box hascolumn">
                        <div>
                            <div className="tit">Depart</div>
                            <span className="content">Apr 11</span>
                            <span className = "week">Today</span>
                        </div>
                        <div>
                            <div className="tit">Depart</div>
                            <span className="content">Apr 11</span>
                            <span className = "week">Today</span>
                        </div>
                    </div>

                    <div className="box hascolumn clearline">
                        <div className="class">
                            <div className="tit">Class</div>
                            <span className="content">Economy</span>
                        </div>
                        <div className="passenger">
                            <div className="tit">Passenger</div>
                            <span className="content">1</span>
                        </div>
                    </div>
                    <div className="search-btn" onClick = {this.search}>Search</div>
                </div>
                <div className="footer-menu">
                    <div className="left">
                        <i className="icon-status"/>
                        <span>Flight Status</span>
                    </div>
                    <div className="right">
                        <i className="icon-bookings"/>
                        <span>My Bookings</span>
                    </div>
                </div>
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
        </Switch>
    </Router>
);

export default Home
;
