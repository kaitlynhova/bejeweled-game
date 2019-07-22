# Bejeweled App [![Build Status](https://travis-ci.org/kaitlynhova/bejeweled-game.svg?branch=master)](https://travis-ci.org/kaitlynhova/bejeweled-game)
This is a basic bejeweled grid app that was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**Demo:** [View Here](https://bejeweled-game.surge.sh)

<img src="https://github.com/kaitlynhova/bejeweled-game/blob/master/public/preview.png" width="300"/>

**What this app does:**
- Randomly generates a grid of colors without 3 matching colors next to each other on page load
- Randomly re generates this grid ^^ of colors by pressing on a button in the sidebar
- Has the ability to click on any two adjacent squares to "swap them"
- It removes all adjacent matches for the two swapped squares
- Keeps score for the number of squares in the matches you make
- Moves all of the squares above the newly empty match area "down" until they are stacked on top of other non empty squares
- Repopulates the top part of the grid after squares "fall down" ^^ with random colored squares

**What this app des not do but could do in the future:**
- Remove all random matches not directly next to the two swapped squares
- Other extra gamplay mechanics that the regular bejeweled game has
- Create additional tests 
- Organize repeatable helper functions instead of implementing them as class functions

## Prerequisites
You must have node installed.

## To Start
1. Clone this repo
    ```
    git clone https://github.com/kaitlynhova/bejeweled-game.git
    ```
2. In your project folder in Terminal, run:
   - `npm install`
   - `npm start`
3.  Open [localhost:3000](http://localhost:3000) to view it in the browser.

## Testing 
run `npm test` in your project folder in Terminal
