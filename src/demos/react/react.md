State & 生命周期
    参考./clock.jsx
    让我们快速回顾一下发生了什么以及调用方法的顺序：
        1.当 <Clock /> 被传递给 ReactDOM.render() 时，React 调用 Clock 组件的构造函数。 由于 Clock 需要显示当前时间，所以使用包含当前时间的对象来初始化 this.state 。 我们稍后会更新此状态。
        2.React 然后调用 Clock 组件的 render() 方法。这是 React 了解屏幕上应该显示什么内容，然后 React 更新 DOM 以匹配 Clock 的渲染输出。
        3.当 Clock 的输出插入到 DOM 中时，React 调用 componentDidMount() 生命周期钩子。 在其中，Clock 组件要求浏览器设置一个定时器，每秒钟调用一次 tick()。
        4.浏览器每秒钟调用 tick() 方法。 在其中，Clock 组件通过使用包含当前时间的对象调用 setState() 来调度UI更新。 通过调用 setState() ，React 知道状态已经改变，并再次调用 render() 方法来确定屏幕上应当显示什么。 这一次，render() 方法中的 this.state.date 将不同，所以渲染输出将包含更新的时间，并相应地更新DOM。
        5.一旦Clock组件被从DOM中移除，React会调用componentWillUnmount()这个钩子函数，定时器也就会被清除。
事件处理
    1.事件绑定
        (1).React事件绑定属性的命名采用驼峰式写法，而不是小写。
        (2).如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)
        <button onClick={activateLasers}>
            Activate Lasers
        </button>

    2.在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault。
    3.react中只能使用e这个合成事件（需要从参数列表中获取,接受e时要放在参数列表中最后）
    4.this:
        (1)类的方法默认是不会绑定 this 的。这并不是 React 的特殊行为,它是函数如何在 JavaScript 中运行的一部分。根据this规则，在此回调函数中this丢失了隐式绑定（严格模式）,所以采用默认绑定到undefined
        (2)如何绑定
            方法一：绑定 this.handleClick 并把它传入 onClick；
            方法二： 在回调函数中使用箭头函数(但每次渲染都要创建一个回调函数，可能影响性能）；
            方法三：使用属性初始化器语法
    5.向事件处理程序传递参数
        (1)<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
        (2)<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
        参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递

条件渲染
    1.if
    2.与运算符 &&
    3.三目运算符condition ? true : false。
    4.阻止组件渲染: 让 render 方法返回 null 而不是它的渲染结果即可实现。


列表 & keys
    1.渲染多个组件
        (1).你可以通过使用{}在JSX内构建一个元素集合
        (2).使用Javascript中的map()方法循遍历
    2.Keys
        Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的id作为元素的key。
    3.示例
        function ListItem(props) {
            // 对啦！这里不需要指定key:
            return <li>{props.value}</li>;
        }
        
        export default function NumberList(props) {
            const posts = props.posts;
            return (
                <ul>
                    // 在jsx中嵌入map()
                {
                    posts.map((post) =>
                    // 又对啦！key应该在数组的上下文中被指定
                        <ListItem key={post.id} value={post.title} />
                    )
                }
                </ul>
            );
        }

表单
    见./nameForm.jsx
    
状态提升
    使用 react 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。

React理念
    1.拆分组件
        单一功能原则
    2.静态版本
    3.定义 UI 状态的最小(但完整)表示
        每个数据只要考虑三个问题：
            它是通过 props 从父级传来的吗？如果是，他可能不是 state。
            它随着时间推移不变吗？如果是，它可能不是 state。
            你能够根据组件中任何其他的 state 或 props 把它计算出来吗？如果是，它不是 state。