
import React from 'react';
import  './style.scss';

class List extends React.Component {
  render() {
    return (
      <div style={{ 'fontSize': '32px' }}>
        <div className="header">
          <div className="info">Depart To Hong Kong</div>
          <div className="filter">
            <div>Filter</div>
            <div>Sort</div>
          </div>
        </div>
        {/* 列表部分 */}
        <div className="main">
          <div className="item">
            <div className="row1">Cathay Dragon</div>
            <div className="row2">
              <div className="left">
                <div>
                  <div className="time">time</div>
                  <div className="airport">
                    <span>PEK</span>
                    <span>T3</span>
                  </div>
                </div>
                <div>
                  <div className="time">time</div>
                  <div className="airport">
                    <span>PEK</span>
                    <span>T3</span>
                  </div>
                </div>
              </div>
              <div className="right">price</div>
            </div>
            <div className="row3"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default List;
