import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MedalWidget from './MedalWidget';
import { addTotal, sortRows } from './MedalWidget';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MedalWidget />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the component', () => {
  expect(shallow(<MedalWidget />).find('div.medal-widget').exists()).toBe(true);
});

it('sorts by silver then gold', () => {
  const data = [
    { gold: 1, silver: 1 },
    { gold: 2, silver: 1 },
    { gold: 1, silver: 2 }];

  expect(data.sort(sortRows('silver'))).toStrictEqual([
    { gold: 1, silver: 2 },
    { gold: 2, silver: 1 },
    { gold: 1, silver: 1 }]
  );
});

it('sorts by bronze then gold', () => {
  const data = [
    { gold: 1, bronze: 1 },
    { gold: 2, bronze: 1 },
    { gold: 1, bronze: 2 }];

  expect(data.sort(sortRows('bronze'))).toStrictEqual([
    { gold: 1, bronze: 2 },
    { gold: 2, bronze: 1 },
    { gold: 1, bronze: 1 }]
  );
});

it('sorts by total then gold', () => {
  const data = [
    { gold: 1, total: 1 },
    { gold: 2, total: 1 },
    { gold: 1, total: 2 }];

  expect(data.sort(sortRows('total'))).toStrictEqual([
    { gold: 1, total: 2 },
    { gold: 2, total: 1 },
    { gold: 1, total: 1 }]
  );
});

it('sorts by gold then silver', () => {
  const data = [
    { gold: 1, silver: 1 },
    { gold: 2, silver: 1 },
    { gold: 2, silver: 2 }];

  expect(data.sort(sortRows('gold'))).toStrictEqual([
    { gold: 2, silver: 2 },
    { gold: 2, silver: 1 },
    { gold: 1, silver: 1 }]
  );
});

it('adds total to the row', () => {
  const row = { gold: 1, silver: 2, bronze: 3 };
  const rowWithTotal = { gold: 1, silver: 2, bronze: 3, total: 6 };
  expect(addTotal(row)).toStrictEqual(rowWithTotal);
});
