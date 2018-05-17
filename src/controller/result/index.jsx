import React from 'react';
import './style.scss';
class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultInfo: this.props.location.query.resultInfo
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="result">
                {this.state.resultInfo.result}
            </div>
        );
    }
}

export default Result
;
