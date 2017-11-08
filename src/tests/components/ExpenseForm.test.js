import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { },
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'coffee' }
  });
  expect(wrapper.state('description')).toBe('coffee');
});

test('should set note on textarea change', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value: 'note test' }
  });
  expect(wrapper.state('note')).toBe('note test');
});

test('should set amount if valid input', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value: '55.8' },
  });
  expect(wrapper.state('amount')).toBe('55.8');
});

test('should not set amount if invalid input', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value: '12.222' },
  });
  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm onSubmit={onSubmitSpy} />);
  wrapper.setState({
    description: 'coffee',
    amount: '1222',
  });
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { },
  });
  expect(onSubmitSpy).toHaveBeenCalledWith({
    description: 'coffee',
    amount: 122200,
    createdAt: 0,
    note: '',
  });
});

test('should set new date on date change', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.instance().handleDateChange(moment(0));
  expect(wrapper.state('createdAt')).toEqual(moment(0));
});

test('should set focusedCalendarInput on focus change', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.instance().handleFocusChange({ focused: true });
  expect(wrapper.state('focusedCalendarInput')).toBe(true);
});