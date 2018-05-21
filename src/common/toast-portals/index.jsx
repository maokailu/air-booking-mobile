import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}
class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      text: this.props.text || 'there is a message',
      time: this.props.time || 2000
    };
  }
  componentDidMount(){
    // debugger
    // console.log('mount'+this.props.text);
    this.handleShow();
  }
  handleShow = () => {
    if (!this.closeTimer) {
      this.setState({ showModal: true });
    } else {
      clearTimeout(this.closeTimer);
    }
    this.closeTimer = setTimeout(() => {
      this.handleHide();
    }, this.state.time);
  }

  handleHide = () =>{
    this.setState({ showModal: false });
    this.closeTimer = null;
  }

  render() {
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          {this.props.text}
        </div>
      </Modal>
    ) : null;

    return (
      <div className="toast-btn">
        {/* {this.state.text} */}
        {modal}
      </div>
    );
  }
}

export { Toast, appRoot };

//  使用方法
//  1.在您的html页面新建两个id分别为app-root和modal-root的div
//  like this:
//     <div id="root">
//         <div id="app-root"></div>
//         <div id="modal-root"></div>
//     </div>;
//  2.在您对应的jsx文件中引入toast-portals组件并将它渲染到html中
// 引用方法：
// import { App, AppRoot } from './utils/toast-portals';
// 渲染app-root：
// render(
//   <App />, document.getElementById('app-root')
// );
