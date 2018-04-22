import React from 'react';
import './style.scss';
import classNames from 'classnames';
export default class QueueAnim extends React.Component {
    constructor() {
        super();
        this.state = {
            showArea: 0,
            longitude: '',
            latitude: ''
        };
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            let longitude;
            let latitude;
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            console.log(longitude, latitude);
            this.setState({
                latitude: latitude,
                longitude: longitude
            });
        });
    }
  toggle = () => {
      this.setState(prevState =>({
          showArea: !prevState.showArea
      }));
  }
  render() {
      const area = classNames({
          'area': true,
          'show_anim': this.state.showArea !== 0 && this.state.showArea,
          'hide_anim': this.state.showArea !== 0 && !this.state.showArea
      });
      return (
          <div>
              <div className="btn" onClick={this.toggle}>{(this.state.longitude + 'and' + this.state.latitude) || 'Hello'}</div>
              {<div className={area}>hello</div>}
          </div>
      );
  }
}
