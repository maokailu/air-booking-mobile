import React from 'react';
export default class CustomTextInput extends React.Component {
  
    render() {
      return (
          <input id="1" ref={this.props.inputRef} />
      );
    }
  }