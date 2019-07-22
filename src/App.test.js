import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { shallow, mount } from 'enzyme';

const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

describe('Bejeweled app', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Updates the random colors in state on bejeweled button click', () => {
    // Get App
    const app = mount(<App />);
    // Get "Bejewel me!" button
    const bejewelMeButton = app.find('button#reset-button');
    // Get initial colors in state
    const initialColorState = app.state().colors;
    bejewelMeButton.simulate('click');
    // 1 in 64^8 (281,474,976,710,656) chance of false negative 🦃
    expect(app.state().colors).not.toEqual(initialColorState);
  });

  it('swaps squares only if they are adjacent', () => {
    // Get App
    const inputGrid = [
      1, 2, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const expectedOutputGrid = [
      2, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const app = shallow(<App colors={inputGrid} />);
    expect(app.state().indexToSwap).toBe(undefined);
    app.instance().handleGemClick(0)
    expect(app.state().indexToSwap).toBe(0);
    app.instance().handleGemClick(1);
    expect(app.state().indexToSwap).toBe(undefined);
    expect(app.state().colors).toEqual(expectedOutputGrid);
  });

  it('does not swap squares if they are not adjacent', () => {
    // Get App
    const inputGrid = [
      1, 0, 2, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const app = shallow(<App colors={inputGrid} />);
    expect(app.state().indexToSwap).toBe(undefined);
    app.instance().handleGemClick(0);
    expect(app.state().indexToSwap).toBe(0);
    app.instance().handleGemClick(2);
    // NOTE: If the indexToSwap is set
    // and the click event is not adjacent 
    // the the indexToSwap is set to the click event's index
    expect(app.state().indexToSwap).toBe(2);
    expect(app.state().colors).toEqual(inputGrid);
  });

  it('removes vertical matches', () => {
    const inputGrid = [
      0, 1, 2, 0, 0, 0, 0, 0,
      1, 2, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const verticalMatchGrid = [
      1, 0, 2, 0, 0, 0, 0, 0,
      1, 2, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ];
    // populate app with custom grid
    const app = shallow(<App colors={inputGrid} />);
    // click to swap and match vertically
    app.instance().handleGemClick(0);
    expect(app.state().indexToSwap).toBe(0);
    app.instance().handleGemClick(1);
    expect(app.state().indexToSwap).toBe(undefined);
    // test that gravity has been applied
    expect(app.state().colors).not.toBe(verticalMatchGrid);
  });

  it('removes horizontal matches', () => {
    const inputGrid = [
      1, 1, 0, 1, 3, 0, 0, 0,
      0, 0, 3, 3, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const horizontalMatchGrid = [
      -1, -1, -1, 0, 3, 0, 0, 0,
      0, 0, 3, 3, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ];
    // populate app with custom grid
    const app = shallow(<App colors={inputGrid} />);
    // click to swap and match vertically
    app.instance().handleGemClick(2);
    expect(app.state().indexToSwap).toBe(2);
    app.instance().handleGemClick(3);
    expect(app.state().indexToSwap).toBe(undefined);
    // test that gravity has been applied
    expect(app.state().colors).toEqual(horizontalMatchGrid);
  });

  it('removes vertical and horizontal matches', () => {
    const inputGrid = [
      0, 1, 0, 0, 0, 0, 0, 0,
      2, 1, 0, 0, 0, 0, 0, 0,
      1, 0, 1, 1, 0, 0, 0, 0,
      2, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const verticalAndHorizontalMatchGrid = [
      0, -1, 0, 0, 0, 0, 0, 0,
      2, -1, 0, 0, 0, 0, 0, 0,
      0, -1, -1, -1, 0, 0, 0, 0,
      2, -1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ];
    // populate app with custom grid
    const app = shallow(<App colors={inputGrid} />);
    // click to swap and match vertically
    app.instance().handleGemClick(16);
    expect(app.state().indexToSwap).toBe(16);
    console.log(JSON.stringify(app.state()));
    app.instance().handleGemClick(17);
    expect(app.state().indexToSwap).toBe(undefined);
    // test that gravity has been applied
    console.log(JSON.stringify(app.state()));
    expect(app.state().colors).toEqual(verticalAndHorizontalMatchGrid);
  });

  it('removes adjacent matches', () => {
    const inputGrid = [
      2, 1, 0, 0, 0, 0, 0, 0,
      1, 2, 0, 0, 0, 0, 0, 0,
      1, 2, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const adjacentMatchGrid = [
      1, 2, 0, 0, 0, 0, 0, 0,
      1, 2, 0, 0, 0, 0, 0, 0,
      1, 2, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ];
    // populate app with custom grid
    const app = shallow(<App colors={inputGrid} />);
    // click to swap and match vertically
    app.instance().handleGemClick(0);
    expect(app.state().indexToSwap).toBe(0);
    app.instance().handleGemClick(1);
    expect(app.state().indexToSwap).toBe(undefined);
    // test that gravity has been applied
    expect(app.state().colors).not.toBe(adjacentMatchGrid);
  });
});
