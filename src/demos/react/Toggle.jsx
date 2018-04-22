import React from 'react';
export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 'btn'
    };

    this.handleClick1 = this.handleClick1.bind(this);
  }
  // 类的方法默认是不会绑定 this 的。这并不是 React 的特殊行为；它是函数如何在 JavaScript 中运行的一部分。
  // 根据this规则，在此回调函数中this丢失了隐式绑定（严格模式）,所以采用默认绑定到undefined
  // 方法一：绑定 this.handleClick 并把它传入 onClick；
  // 方法二： 在回调函数中使用箭头函数(函数就不会被作为参数赋值从而丢失绑定，但每次渲染都要创建一个不同的回调函数，可能影响性能）；
  // 方法三：使用属性初始化器语法
  handleClick1() { // 事件对象要放在最后
    console.log('handleClick1"s this:', this);
  }
  handleClick2() {
    console.log('handleClick2"s this:', this);
  }
  handleClick3(id, e) {
    e.preventDefault;
    console.log('handleClick3"s this.state.id:' + this.state.id, 'handleClick3"s id:' + id, 'handleClick3"s e:' + e);
  }
  handleClick4(id, e) {
    console.log('handleClick4"s this.state.id:' + this.state.id, 'handleClick4"s id:' + id, 'handleClick4"s e:' + e);
  }
  a=()=>{
    console.log(this);
    b();
    function b() {
      console.log(this); // undefined
    }
  }
  render() {
    return (
      <div>
        {/* 不传参 */}
        <button style = {{ 'fontSize': '5em' }} onClick={this.handleClick1}>
          button1
        </button>
        <br/>
        <button style = {{ 'fontSize': '5em' }} onClick={(e) => this.handleClick2(e)}>
          button2
        </button>
        <br/>
        {/* 传参 */}
        {/* 定义handleClick3也可使用箭头函数。 定义时使用箭头函数，传参时用bind此方法最简洁 and 性能最高*/}
        <button style = {{ 'fontSize': '5em' }} onClick={this.handleClick3.bind(this, this.state.id)}>
          button3
        </button>
        <br/>
        <button style = {{ 'fontSize': '5em' }} onClick={(e) => this.handleClick4(this.state.id, e)}>
          button4
        </button>
      </div>
    );
  }
}

// 获得当前类通过this, 获得事件元素通过e(不需传递)
