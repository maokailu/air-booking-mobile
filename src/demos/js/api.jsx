
import React from 'react';
import  './style.scss';

class Js extends React.Component {
  componentDidMount() {
    // location.href="https://www.baidu.com";
    // console.log(g);
    // this.format();
  }
  // 事件绑定的函数
  search = (e) => {
    console.log(this);
    console.log(e);
    console.log(e.currentTarget);
    console.log(e.target);
  }
  // 闭包应用场景
  closure=()=>{
    function wait() {
      // setTimeout(function time(){
      //     console.log(message);
      // }, 1000)
      var me = 'me';
      function time() {
        console.log('limiande' + me);
      }
      time();
      return time;
    }
    var baz = wait();
    baz();
  }
  // 对象委托
  prototype=()=>{
    var LoginController = {
      errors: ['LOGIN1', 'LOGIN2'],
      getUser() {
        console.log('loginUser');
      },
      getPassword() {
        console.log('loginPassword');
      }
    };
    var AuthController = {
      en: ['haha'],
      checkAuth() {
        // ...
      },
      server() {
        console.log('SERVER');
      }
    };
    // 现在把AuthController关联到LoginController
    Object.setPrototypeOf(AuthController, LoginController);
    console.log(AuthController.en, AuthController.errors);
    AuthController.getUser();
    AuthController.server();
  }
  // promise
  promiseHandler=()=>{
    // 用promise封装一个ajax对象
    const getJSON = function(url) {
      const promise = new Promise(function(resolve, reject) {
        const handler = function() {
          if (this.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error(this.statusText));
          }
        };
        const client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.send();
      });
      return promise;
    };
    getJSON('').then(function(json) {
      console.log('Contents: ' + json);
    }, function(error) {
      console.error('出错了', error);
    });
  }
  // cookie
  cookie=()=>{
    document.cookie = 'name1=3';
    document.cookie = 'name2=4';
  }
  // 日期格式化
  format= () =>{
    // Date类型
    // 获得时间戳
    var timestamp1 = Date.parse('12/2/2017');
    var timestamp2 = Date.UTC(2017, 11, 2);
    var timestampStart = Date.now();
    var timestampStop = Date.now();
    // 获得日期对象
    var date1 = new Date();
    var date2 = new Date(1000);
    var date3 = new Date(timestamp1);
    var date4 = new Date(timestamp2);
    var result = timestampStop - timestampStart;

    console.log(
      'date1:' + date1 + '\n',
      'date2:' + date2 + '\n',
      'timestamp:' + timestamp1 + '\n',
      'timestamp2:' + timestamp2 + '\n',
      'date3:' + date3 + '\n',
      'date4:' + date4 + '\n',
      'result:' + result + '\n\n'
    );

    // 普通日期格式化方法
    var showdate1 = date1.toDateString();
    var showdate2 = date1.toTimeString();
    var showdate3 = date1.toLocaleDateString();
    var showdate4 = date1.toLocaleTimeString();
    var showdate5 = date1.toUTCString();
    console.log(
      'showdate1:' + showdate1 + '\n',
      'showdate2:' + showdate2 + '\n',
      'showdate3:' + showdate3 + '\n',
      'showdate4:' + showdate4 + '\n',
      'showdate5:' + showdate5 + '\n\n',
    );

    // 常见格式
    var _options = {
      ZH: {
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        shortDayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        shortMonthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      US: {
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        shortDayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        shortMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    };
    var date = new Date();
    var o = {
      y: date.getFullYear(), // 年
      M: date.getMonth(), // 月份
      d: date.getDate(), // 日
      w: date.getDay(), // 周
      h: date.getHours(), // 小时
      m: date.getMinutes(), // 分
      s: date.getSeconds(), // 秒
      q: Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    };
      // 周六， 12月2日
    var showDate1 =  _options.ZH.shortDayNames[o.w] + ', ' + (o.M + 1) + '月' + o.d + '日';
    // Sat, Dec 2
    var showDate2 = _options.US.shortDayNames[o.w] + ', ' + _options.US.shortMonthNames[o.M] + ' ' + o.d;
    console.log(showDate1 + '\n', showDate2);
  }
  render() {
    return (
      <div>
          打开控制台
      </div>
    );
  }
}

// class and inherit
class Parent extends React.Component {
  constructor(num) {
    super();
    this.num = num;
  }
  sayNum() {
    console.log('sayParentNum:' + this.num);
  }
}

export default class Children extends Parent {
  constructor(name) {
    super(7);
    this.name = name;
  }
  sayNum() {
    console.log('\nsayParentNum:' + this.num);
    console.log('sayChildrenName:' + this.name);
    super.sayNum();
  }
  render() {
    return <div></div>;
  }
}


var parent = new Parent(6);
parent.sayNum();
var children = new Children('children');
children.sayNum();
