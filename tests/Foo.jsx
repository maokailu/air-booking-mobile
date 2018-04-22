import React from 'react';

const defaultProps = {};

class Foo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="foo">
        Bar
      </div>
    );
  }
}

Foo.defaultProps = defaultProps;

export default Foo;
