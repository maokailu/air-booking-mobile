import React from 'react';
import './style.scss';
export default function Title(props){
    return(
        <div className={props.currentIndex === props.index ? 'title' : ''} onClick={props.toggleTitle.bind(this, props.index)}>{props.title.text}</div>
    )
}