import React from 'react';
import  './style.scss';

export default class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        };
    }
    componentDidMount(){
        // 挂载
        this.timerID = setInterval(
            ()=>this.tick(), 1000
        )
    }
    componentWillUnmount(){
        // 卸载
        clearInterval(this.timerID);
    }
    tick(){
        this.setState({
            date: new Date()
        });
    }
    render(){
        return (
            <div>
                <div>Hello, world!</div>
                <div>It is {this.state.date.toLocaleTimeString()}.</div>
            </div>
        );
    }
}

