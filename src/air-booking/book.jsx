import React from 'react';
import './book.scss';
export default class Book extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
    }
    componentDidMount() {
    }
    goToDetail = () => {
    }
    render() {
        return (
            <div className="book" onClick={this.goToPay}>
                填写页
            </div>
        );
    }
}
