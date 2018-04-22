
import React from 'react';
import  './style.scss';

export default class Search extends React.Component {
  // 定义属性
  constructor(props) {
    super(props);
    this.state = {
      currentTab: ''
    };
  }
    // 事件绑定的函数
    search = () => {
      console.log(event);
    }
    tabToggle=() =>{
      console.log(event);
      // 获得它的索引
      // 改变它的样式
    }
    render() {
      return (
        <div style={{ 'fontSize': '32px' }}>
          <div className="header">
            <div className="logo">Logo</div>
            <div className="slogan">This is a slogan</div>
          </div>
          <div className="main">
            <div className="nav">
              <div>Hotel</div>
              <div>Flights</div>
              <div>Trains</div>
            </div>
            <div className="search-box">
              <div className="tab">
                <div onClick={this.tabToggle}>Round Trip</div>
                <div>One-way</div>
              </div>
              <div className="search-city">
                <div className="dcity">
                  <div className="tip">From</div>
                  <div className="dcityinfo">
                    <div className="info">Beijing</div>
                    <div className="code">All airports</div>
                  </div>
                </div>
                <div className="acity">
                  <div className="tip">From</div>
                  <div className="acityinfo">
                    <div className="info">Shanghai</div>
                    <div className="code">All airports</div>
                  </div>
                </div>
              </div>
              <div className="ddate">
                <div className="tip">Depart</div>
                <div className="info">Nov 28</div>
              </div>
              <div className="person">
                <div>
                  <div className="tip">Passenger(Adults)</div>
                  <div className="info">
                    <span className="minus">-</span>
                    <span className="num">9</span>
                    <span className="add">+</span>
                  </div>
                </div>
                <div>
                  <div className="tip">Class</div>
                  <div className="info">Economy</div>
                </div>
              </div>
              <div className="btn" onClick={this.search}>Search</div>
            </div>
            <div className="mybookings">My Bookings</div>
          </div>
        </div>
      );
    }
}
