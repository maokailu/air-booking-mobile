import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Toast from '../src/components/Toast2';

class Test extends Component {
  constructor(props) {
    super(props);
  }
  handleToast = () =>{
    Toast.info();
  }
  render() {
    return (
      <div className="btn" onClick ={this.handleToast.bind(this)}>btn</div>
    );
  }
}
describe('A suite', () => {
  // test
  // const MockFn = jest.fn();
  jest.useFakeTimers();
  const wrapper = shallow(<Test />);
  it('Test Component should be render', function() {
    expect(wrapper.find('.btn').length).toBe(1);
  });
  it('Should render Toast with correct DOM structure', () => {
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
  it('Simulates click events', function() {
    wrapper.find('.btn').at(0).simulate('click');
    // expect(wrapper.find('.toast').length).toBe(1);?
    // expect(MockFn).toHaveBeenCalled();
  });
  it('CloseTimer works', function() {
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
    expect(wrapper.find('.toast').length).toBe(0);
  });
});
