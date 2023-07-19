/**
 * Script that starts the game: movements, events and clock
 */


/** @type {Object} The entire actual game */
let game = generate(genFact.x, genFact.y);

/** @type {String[][]} Board of string with all the cells: `⬛` barriers and/or `⬜` empty */
let maze = game["maze"];

/** @type {Object} Object with the coords of all the entities: `😀` player and `🔑` goal */
let entities = game["entities"];

/** @type {Object} The player with it `x` and `y` coords */
let player = entities.user;
showMaze(copy(game));

// Start the clock
let time = { start: new Date() };
updateClock();

// Check the keyboard
document.addEventListener("keydown", e => {
    let player = entities.user;

    /** @type {Object} The movement controls and them value */
    const movementControls = {
        "ArrowUp": {x: 0, y: -1},
        "KeyW": {x: 0, y: -1}, 
        "ArrowRight": {x: 1, y: 0},
        "KeyD": {x: 1, y: 0}, 
        "ArrowDown" : {x: 0, y: 1}, 
        "KeyS" : {x: 0, y: 1}, 
        "ArrowLeft": {x: -1, y: 0},
        "KeyA": {x: -1, y: 0}
    };

    /** @type {Key[]} The back controls and them value */
    const backControls = ["KeyM", "Backspace", "Delete", "Escape", "Pause"];

    // Check if the pressed key is a movement key
    if (Object.keys(movementControls).some(elmnt => elmnt == e.code)) {
        /** @type {Number} Get the change in `x` with the pressed key */
        let changeX = movementControls[e.code].x;

        /** @type {Number} Get the change in `y` with the pressed key */
        let changeY = movementControls[e.code].y;

        // Check if the change is possible (doesn't collide with a barrier)
        if (maze[player.y + changeY][player.x + changeX] != '⬛')
        {  
            // Change the `player` coords
            player.x += changeX;
            player.y += changeY;

            // Check if the `player` wins with the movement
            if (checkWin(entities))
            {
                win();

                
                setTimeout(() => {
                    if (wins != winsGoal)
                    {
                        reset();
                    }
                    else
                    {
                        endGame();
                    }
                }, 500);
            }

            // Recharge the `maze` and `board`
            showMaze(copy(game));
        }

    // Return to home `keys`
    } else if (backControls.some(elmnt => elmnt == e.code)) {
        window.location.replace("index.html");
    }
});