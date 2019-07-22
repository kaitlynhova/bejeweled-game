import React from 'react';
import { ThemeContext } from './theme.js'
import { FlexWrapper, Grid, Screen, SideBar, Square } from './components'

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      indexToSwap: undefined,
      colors: props.colors || this.generateColors() // Add colors prop so we can mock behavior for tests
    }
    this.resetColors = this.resetColors.bind(this);
  }
  generateColors() {
    // Generate an array of 64 with random integers
    const colors = new Array(64).fill(0).map(() => { return this.getRandomInt(200) % 8 });
    // Make sure there aren't any long matches
    const directions = [8, -8, -1, 1];
    for (let i = 1; i < colors.length - 1; i++) {
      directions.forEach((direction) => {
        // If there is a match directly next to the square
        if (colors[i + direction] === colors[i]) {
          // Mix it up, fam
          colors[i] = (colors[i - 1] + 1) % 8;
        }
      })
    }
    return colors;
  }
  checkForVerticalMatches(index) {
    const colorToMatch = this.state.colors[index];
    const matchArray = [index];

    // Sweep to the top
    for (let i = index - 8; i >= 0; i -= 8) {
      if (this.state.colors[i] !== colorToMatch) {
        break;
      }
      matchArray.push(i);
    }

    // Sweep to the bottom
    for (let i = index + 8; i < 64; i += 8) {
      if (this.state.colors[i] !== colorToMatch) {
        break;
      }
      matchArray.push(i);
    }

    if (matchArray.length >= 3) {
      matchArray.sort((a, b) => a - b);
      return matchArray;
    }
    return [];
  }
  checkForHoizontalMatches(index) {
    const colorToMatch = this.state.colors[index];
    const matchArray = [index];

    // Sweep to the left
    for (let i = index - 1; i >= Math.floor(index / 8) * 8; i--) {
      if (this.state.colors[i] !== colorToMatch) {
        break;
      }
      matchArray.push(i);
    }

    // Sweep to the right
    for (let i = index + 1; i < Math.floor(index - (index % 8)) + 8; i++) {
      if (this.state.colors[i] !== colorToMatch) {
        break;
      }
      matchArray.push(i);
    }
    if (matchArray.length >= 3) {
      matchArray.sort((a, b) => a - b);
      return matchArray;
    }
    return [];
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  handleGemClick(index) {
    // If we have two indexes to swap && they are next to each other
    if (this.state.indexToSwap !== undefined && this.isNextToSquare(index)) {
      // Swap the colors
      this.swapColors(index, this.state.indexToSwap);
    }
    // Else set indexToSwap in state
    else {
      this.setState({ indexToSwap: index });
    }
  }
  handleMatches(targetIndex, index) {
    // Find if there is a lengthy match in any direction
    const verticalMatches = this.checkForVerticalMatches(targetIndex).concat(this.checkForVerticalMatches(index));
    const horizontalMatches = this.checkForHoizontalMatches(targetIndex).concat(this.checkForHoizontalMatches(index));
    const singleMatchArray = [...verticalMatches, ...horizontalMatches]
    if (singleMatchArray.length) {
      // Increment the score
      const score = this.state.score + singleMatchArray.length;
      this.setState({ score });

      // STEP 1: Make Squares visually disappear from view
      // by setting the color value to -1
      this.setState(prevState => ({
        colors: prevState.colors.map((color, i) => singleMatchArray.includes(i) ? -1 : color)
      }))
      // STEP 2: Make Squares above "fall down" like gravity
      setTimeout(() => {
        this.setState(prevState => {
          const colors = prevState.colors.slice();
          // For each row;
          for (let x = 0; x < 8; x++) {
            let gapLength;
            let gapBegins;
            // For each column;
            for (let y = 7; y >= 0; y--) {
              const currentIndex = x + (y * 8);
              // If you hit your first -1 square in the grid set gapBegins
              if (colors[currentIndex] === -1 && gapBegins === undefined) {
                gapBegins = y;
              } else if (gapLength === undefined && gapBegins !== undefined && colors[currentIndex] !== -1) {
                gapLength = gapBegins - y;
              }
              // If we know the length of the gap
              if (gapLength !== undefined) {
                // Swap the -1 squares with the colors on top of them in the grid (Gravity)
                const placeholder = colors[currentIndex + gapLength * 8];
                colors[currentIndex + gapLength * 8] = colors[currentIndex];
                colors[currentIndex] = placeholder;
              }
            }
          }
          return { colors };
        });
      }, 1000);
      // STEP 3: Repopulate the empty squares at the top
      setTimeout(() => {
        this.setState(prevState => ({
          colors: prevState.colors.map(color => color === -1 ? this.getRandomInt(8) : color)
        }))
      }, 2000)
    }
  }
  // Returns Boolean if square is next to another square
  isNextToSquare(index) {
    const directions = [1, -1, 8, -8];
    let answer = false;
    directions.forEach((direction) => {
      if ((index + direction) === this.state.indexToSwap) {
        answer = true;
        return;
      }
    });
    return answer;
  }
  // Resets Grid with all brand new square colors
  resetColors() {
    const colors = this.generateColors();
    this.setState({ colors });
  }
  swapColors(firstIndex, secondIndex) {
    let newColors = this.state.colors.slice();
    // Do the swap
    const secondColor = newColors[secondIndex];
    newColors[secondIndex] = newColors[firstIndex];
    newColors[firstIndex] = secondColor;
    // Set the new state
    this.setState(
      { colors: newColors, indexToSwap: undefined },
      () => { this.handleMatches(secondIndex, firstIndex) });
  }
  render() {
    const jewelSquares = this.state.colors.map((x, i) =>
      <Square
        isActive={i === this.state.indexToSwap}
        index={i}
        key={i}
        colorIndex={x}
        onClick={() => this.handleGemClick(i)} />);
    return (
      <ThemeContext>
        <FlexWrapper>
          <Screen>
            <Grid>
              {jewelSquares}
            </Grid>
            <SideBar resetColors={this.resetColors} score={this.state.score} />
          </Screen>
        </FlexWrapper>
      </ThemeContext>
    );
  };
}

export default App;