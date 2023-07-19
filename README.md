<h1 align="center">Emoji Maze</h1>

**Solve mazes with emojis in different game modes: normal, hard, get the goal and infinity.**

<img alt="Menu section in Emoji Maze" src="https://i.postimg.cc/3rXXw88Q/Emoji-Maze-Menu.png" width="45%"/><img alt="Gameplay in Emoji Maze" src="https://i.postimg.cc/mrP3Z7Dm/Emoji-Maze-Game.png" width="45%"/>


## 🎥 Video demo

[Demo "Emoji Maze" by Izak Cancino for CS50x 2023](https://youtu.be/6eCAmZA8q40)

## 📌 Characteristics

- **Game modes:** The extension has four game modes, each with different functionality or goals, they are:

    - **🐣 Normal:** It has the goal to complete one maze with normal difficult, it is a 11x11 grid. The score taken in this game mode is the time used to complete the maze.

    - **👿 Hard:** Is similar to the *Normal* mode, but its principal difference is the size of the maze, it is a 27x27 grid.

    - **🏁 Get the goal:** In this game mode the goal to reach is complete ten mazes, them difficult level is gradual, starting with 11x11 grids until reach 27x27. The punctuation taken in this is the time, the lowest time is best.

    - **⌛ Infinity:** Every time that the user opens this game mode the difficult grade will be restarted, but the score will be persistent, this game mode never ends, so the score doesn't have limits.

- **Random mazes:** When the user starts a game, the maze is randomly generated, cell by cell, doing that the user have every time a different maze, creating always a new challenge to solve.

- **High scores:** Each game mode have a different use of the high scores, but them will always be saved locally doing them persistent and giving to the user the possibility of improve themselves.


## 💻 Technical characteristics

All the functionalities were made with JavaScript: the maze generation system, printing them, listening for each key pressed and them responses (move the player or exit to the menu).

The randomness system function in the next way:

 - First was given some `width` and `height` values, all the grid is filled with `⬜`, after all the out-border is filled with `⬛` limiting the movement only in the grid.

 - After that, all the cells where the `x` and `y` coordinates are even, is added a `⬛` and its position is saved in an array, this until end with all the even coordinates.

 - Next to that, with the array of coordinates, for each coordinate is selected a contiguous cell (top, right, bottom, or left) and filled with a `⬛`, until end with all the array.

 - Later, randomly is selected a grid corner (`top-right`, `top-left`, `bottom-left`, or `bottom-right`), after that is added a predesigned spawn box (where the `player` will spawn), and in the opposite corner are selected and saved the `goal` coordinates.

 - Finally, the maze grid and entities coordinates (the `player` and `goal`) are joined and showed.

## ✨ Usage

Download the folder, charge it in your [Chrome Extensions Manager](chrome://extensions/), open it and start to play!

### Menu

Select a game mode to start to play it.

### Game

The objects in the maze are:
```
😀 <--- The player
🔑 <--- The goal
⬛ <--- The barriers cells (the user can't pass over them)
⬜ <--- The empty cells (the user can pass over them)
```

For win one maze, you need to move the player emoji across the maze to get the key emoji.

The controls are:
```
Player movement:
[W or Up]       <--- Go up
[S or Down]     <--- Go down
[A or Left]     <--- Go to the left
[D or Right]    <--- Go to the right

Others:
[M, Backspace, Delete, Escape or Pause] <--- Return to the menu
```

## 🌐 Author
Izak Cancino
- GitHub: [@IzakCancino](https://github.com/IzakCancino)
- Gmail: cancinoizak@gmail.com
- Portfolio: [izakcancino.github.io](http://izakcancino.github.io)
