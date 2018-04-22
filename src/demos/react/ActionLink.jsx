import React from 'react';
const ActionLink = (props) => {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }
  
    return (
        <a href="https://www.baidu.com" onClick={handleClick}>
        Click me
        </a>
    );
}
export default ActionLink;