/**
 * Script with game functions
 */


/**
 * Generate in the maze the start box where the `user` will spawn
 * @param {String[][]} maze Bidimensional array with all the maze and cells
 * @param {Number} width The maze's width
 * @param {Number} height The maze's height
 * @param {String} corner Specify the corner to put the starting point, accepted values: `top-left`, `top-right`, `bottom-left` and `bottom-right`
 */
function generateStart(maze, width, height, corner="top-left") {
    let initial = {};
    let end = {};
    let gapA = {};
    let gapB = {};
    let modifier = {
        end: {},
        initial: {}
    };

    // Selecting the reference values for the start box
    if (corner == "top-left")
    {
        initial.x = 0;
        initial.y = 0;
        end.x = 4;
        end.y = 4;

        gapA.x = 2;
        gapA.y = 4;
        gapB.x = 4;
        gapB.y = 2;

        modifier.initial.x = +1;
        modifier.initial.y = +1;
        modifier.end.x = +1;
        modifier.end.y = +1;
    }
    else if (corner == "top-right")
    {
        initial.x = width - 1 - 4;
        initial.y = 0;
        end.x = width - 1;
        end.y = 4;

        gapA.x = width - 1 - 4;
        gapA.y = 2;
        gapB.x = width - 1 - 2;
        gapB.y = 4;

        modifier.initial.x = -1;
        modifier.initial.y = +1;
        modifier.end.x = -1;
        modifier.end.y = +1;
    }
    else if (corner == "bottom-left")
    {
        initial.x = 0;
        initial.y = height - 1 - 4;
        end.x = 4;
        end.y = height - 1;
        
        gapA.x = 2;
        gapA.y = height - 1 - 4;
        gapB.x = 4;
        gapB.y = height - 1 - 2;

        modifier.initial.x = +1;
        modifier.initial.y = -1;
        modifier.end.x = +1;
        modifier.end.y = -1;
    }
    else 
    {
        initial.x = width - 1 - 4;
        initial.y = height - 1 - 4;
        end.x = width - 1;
        end.y = height - 1;

        gapA.x = width - 1 - 2;
        gapA.y = height - 1 - 4;
        gapB.x = width - 1 - 4;
        gapB.y = height - 1 - 2;

        modifier.initial.x = -1;
        modifier.initial.y = -1;
        modifier.end.x = -1;
        modifier.end.y = -1;
    }

    // Filling the outside box with empty cells
    for (let i = initial.y + modifier.initial.y; i <= end.y + modifier.end.y; i++)
    {
        for (let j = initial.x + modifier.initial.x; j <= end.x + modifier.end.x; j++)
        {
            maze[i][j] = '⬜';
        }
    }

    // Filling the box with barriers
    for (let i = initial.y; i <= end.y; i++)
    {
        for (let j = initial.x; j <= end.x; j++)
        {
            maze[i][j] = '⬛';
        }
    }

    // Filling the internal box with empty cells
    for (let i = initial.y + 1; i < end.y; i++)
    {
        for (let j = initial.x + 1; j < end.x; j++)
        {
            maze[i][j] = '⬜';
        }
    }

    // Doing the gaps in the box
    maze[gapA.y][gapA.x] = '⬜';
    maze[gapB.y][gapB.x] = '⬜';

    return {
        x: initial.x + (Math.abs(end.x - initial.x) / 2),
        y: initial.y + (Math.abs(end.y - initial.y) / 2)
    }
}

/**
 * Create the `goal` coords and clean the near cells
 * @param {String[][]} maze Bidimensional array with all the maze and cells
 * @param {Number} width The maze's width
 * @param {Number} height The maze's height
 * @param {String} corner Specify the corner to put the starting point, accepted values: `top-left`, `top-right`, `bottom-left` and `bottom-right`
 */
function generateGoal(maze, width, height, corner) {
    let modifier = {};

    // Selecting the reference values for the start box
    if (corner == "top-left")
    {
        modifier.x = 1;
        modifier.y = 1;
    }
    else if (corner == "top-right")
    {
        modifier.x = 0;
        modifier.y = 1;
    }
    else if (corner == "bottom-left")
    {
        modifier.x = 1;
        modifier.y = 0;
    }
    else 
    {
        modifier.x = 0;
        modifier.y = 0;
    }

    let x = (modifier.x * width) - 1 + (!modifier.x ? 1 : -1) * 3 + (!modifier.x ? 1 : 0);
    let y = (modifier.y * height) - 1 + (!modifier.y ? 1 : -1) * 3 + (!modifier.y ? 1 : 0);

    maze[y][x + 1] = '⬜';
    maze[y + 1][x] = '⬜';
    maze[y][x - 1] = '⬜';
    maze[y - 1][x] = '⬜';

    return {x, y};
}

/**
 * Generate a contiguos barrier giving another
 * @param {Number} x The basis barrier `x` coord
 * @param {Number} y The basis barrier `y` coord
 */
function generateBarrier(x, y)
{
    i = randomInt(1, 4);

    if (i == 1)
    {
        x++;
    }
    else if (i == 2)
    {
        y++;
    }
    else if (i == 3)
    {
        x--;
    }
    else
    {
        y--;
    }
    
    return {x, y};
}

/**
 * Create the `maze` and `entities` for playing
 * @param {Number} width The maze's width, it need to be greater than 7 and odd
 * @param {Number} height The maze's height, it need to be greater than 7 and odd
 */
function generate(width=11, height=11) {
    if (width <= 7 || height <= 7 || width % 2 == 0 || height % 2 == 0)
    {
        return {};
    }

    /** @type {String[][]} Board of string with all the cells: `⬛` barriers and/or `⬜` empty */
    let maze = Array.from(Array(height), () => Array.from(Array(width), () => '⬜'));

    /** @type {Object[]} Secondary barriers */
    let barriers = [];

    // Creating the principal border barriers
    maze = maze.map((row, y) => {
        return row.map((cell, x) => {
            if (y == 0 || y == height - 1)
            {
                return '⬛';
            }
            else if (x == 0 || x == width - 1)
            {
                return '⬛';
            }
            else if (x % 2 == 0 && y % 2 == 0)
            {
                barriers.push(generateBarrier(x, y));
                return '⬛';
            }
            else
            {
                return '⬜';
            }
        })
    });

    barriers.forEach(barrier => {
        maze[barrier.y][barrier.x] = '⬛';
    });

    let corner = CORNERS[randomInt(0, 3)];

    // Generating the spawn and player
    let spawn = generateStart(maze, width, height, corner);

    // Generating the goal
    let goalCoords = generateGoal(maze, width, height, corner);

    return {
        "maze": maze,
        "entities": {
            game: {
                win: false
            },
            user: {
                x: spawn.x,
                y: spawn.y
            },
            goal: {
                x: goalCoords.x,
                y: goalCoords.y
            }
        }
    };
}

/**
 * Combine the two arrays in the `game` and print it
 * @param {Object} game An object with all the `maze` and `entities` information
 */
function showMaze(game) {
    /** @type {String[][]} Board of string with all the cells: `⬛` barriers and/or `⬜` empty */
    let maze = game["maze"];

    /** @type {Object} Object with the coords of all the entities: `😀` player and `🔑` goal */
    let entities = game["entities"];

    // Check if the game is already won, changing the sprites
    if (entities.game.win)
    {
        maze[entities.user.y][entities.user.x] = '🥳';
    }
    else
    {
        maze[entities.user.y][entities.user.x] = '😀';
        maze[entities.goal.y][entities.goal.x] = '🔑';
    }

    // Joining the `maze` array to a string and showing it
    maze = maze.map(row => row.join("")).join("<br>");
    board.innerHTML = maze;
}

/**
 * Check if the `user` and the `goal` are in the same cell
 */
function checkWin() {
    let user = entities.user;
    let goal = entities.goal;

    return user.x == goal.x && user.y == goal.y;
}

/**
 * Set the game value as won, and show the message
 */
function win() {
    showMaze(copy(game));
    entities.game.win = true;

    wins++;

    // Show win message
    history.style.opacity = 1;
    score.innerHTML = wins;
    setTimeout(() => {
        history.style.opacity = 0;
    }, 800);

    // Not continue if the user get the goal
    if (wins == winsGoal)
    {
        return;
    }

    // Update the high-score for each win
    if (GAMEMODE == "Infinity")
    {
        let hs = localStorage.getItem(GAMEMODE);
        if (hs)
        {
            hs = JSON.parse(hs);
            localStorage.setItem(GAMEMODE, JSON.stringify(hs + 1));
        }
        else
        {
            localStorage.setItem(GAMEMODE, JSON.stringify(1));
        }

        showHighscore(false);
    }

    // Update the generation factor until reach 27x27
    genFact.x += genFact.x >= 27 ? 0 : 2;
    genFact.y += genFact.y >= 27 ? 0 : 2;

    // Board animation
    setTimeout(() => {
        board.style.opacity = 0;
    }, 400);
}

/**
 * Resets the game
 */
function reset() {
    game = generate(genFact.x, genFact.y);
    maze = game["maze"];
    entities = game["entities"];

    showMaze(copy(game));
    board.style.opacity = 1;
}

/**
 * 
 * @param {String} hs The new high-score to save 
 */
function newHighscore(hs) {
    board.innerHTML = "New high-score!!!" + board.innerHTML;
    localStorage.setItem(GAMEMODE, JSON.stringify(hs));
}

/**
 * Finish the game (called after `win()`)
 */
function endGame() {
    // Shows a message
    board.innerHTML =  `
        <p>You win!<p>
        <a href="index.html"><button>Go back</button></a>
    `;
    board.style.fontFamily = "Arial";
    board.style.fontSize = "30px";

    // Get the play time
    time.total = updateClock();

    // If the `GAMEMODE` is `Normal`, `Hard` or `Get to goal` update the high-score
    if (GAMEMODE == "Normal" || GAMEMODE == "Hard" || GAMEMODE == "Get the goal")
    {
        // Get the previews high-score
        let hs = localStorage.getItem(GAMEMODE);

        // If the high-score exists
        if (hs)
        {
            // Update or keep the high-score
            hs = JSON.parse(hs);
            if (time.total.min < hs.min)
            {
                newHighscore(time.total);
            }
            else if (time.total.min == hs.min && time.total.sec < hs.sec)
            {
                newHighscore(time.total);
            }
        }
        // If not, save it
        else
        {
            newHighscore(time.total);
        }
    }
}