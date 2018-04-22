import React from 'react';
import CustomTextInput from './customTextInput.jsx';
import './style.scss';
export default class CustomTextFocus extends React.Component{
    render(){
        return(
            <CustomTextInput
                inputRef={el => this.inputElement = el} />
        )
    }
}