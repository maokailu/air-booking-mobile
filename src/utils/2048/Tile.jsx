import React from 'react';
import './style.scss';

export default class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let tile = 'tile-' + this.props.num;
        return <div className={'tile ' + tile + (this.props.anim ? ' show_anim' : '')}>{this.props.num}</div>;
    }
}
