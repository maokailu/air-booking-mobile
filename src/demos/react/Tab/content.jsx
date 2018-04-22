import React from 'react';
import './style.scss';
export default function Content(props){
    return(
        <div className={props.currentIndex === props.index ? 'content' : ''}>{props.content.text}</div>
    )
}