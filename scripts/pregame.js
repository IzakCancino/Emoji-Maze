/**
 * Script that starts the pregame: initialize the basic variables, selects all the HTML Elements and modify the game given the `GAMEMODE` 
 */


/**
 * Paragraph that shows `maze`
 * @type {HTMLParagraphElement} 
 */
let board = document.querySelector("#board");

/**
 * Paragraph that shows the game mode instructions
 * @type {HTMLParagraphElement} 
 */
let instructions = document.querySelector("#instructions");

/**
 * Paragraph that joins the title and `score`
 * @type {HTMLParagraphElement} 
 */
let scoreBar = document.querySelector("#score-bar");

/**
 * Paragraph that joins the title and `clock`
 * @type {HTMLParagraphElement} 
 */
let clockBar = document.querySelector("#clock-bar");

// Selecting all the score and time elements
let spans = document.querySelectorAll("span");
let mode = spans[0];
let highscore = spans[1];
let score = spans[2];
let history = spans[3];
let clock = spans[4];

// Create the wins count, the goal and the maze generation factor in each coord
let wins = 0;
let winsGoal = 0;
let genFact = {
    x: 11,
    y: 11
};
const CORNERS = ["top-left", "top-right", "bottom-left", "bottom-right"];



/**
 * Prints the high-score with a format
 * @param {Boolean} isTime Indicate if the actual high-score is a time or not (points)
 */
function showHighscore(isTime) {
    let hs = localStorage.getItem(GAMEMODE);
    if (hs)
    {
        hs = JSON.parse(hs);
        if (isTime)
        {
            highscore.innerHTML = hs.min + ":" + (hs.sec < 10 ? "0" + hs.sec : hs.sec)
        }
        else
        {
            highscore.innerHTML = hs;
        }
    }
    else
    {
        highscore.innerHTML =  "--";
    }
}



/** @type {Object} Instructions for each type of `GAMEMODE` */
const instr = {
    "Normal": ", get the key and win!",
    "Hard": ", get the key and win!",
    "Get the goal": ", get 10 keys and win!",
    "Infinity": " and get keys"
};

/** @type {String} Indicate the selected game mode: `Normal`, `Hard`, `Get to goal` or `Infinity` */
const GAMEMODE = sessionStorage.getItem("gamemode");

// Modify the game, goal and factors given the `GAMEMODE`
mode.innerHTML = GAMEMODE;
instructions.innerHTML = "Use the arrow keys to move you" + instr[GAMEMODE];

if (GAMEMODE == "Normal")
{
    // Not score and only one maze
    scoreBar.style.opacity = 0;
    winsGoal = 1;
    showHighscore(true);
}
else if (GAMEMODE == "Hard")
{
    // Not score, only one maze and 27x27 generation factor
    scoreBar.style.opacity = 0;
    winsGoal = 1;
    genFact = {
        x: 27,
        y: 27
    };
    showHighscore(true);
}
else if (GAMEMODE == "Get the goal")
{
    // Ten mazes
    winsGoal = 10;
    showHighscore(true);
}
else
{
    // Not score, not clock, infinity number of mazes
    scoreBar.style.opacity = 0;
    clockBar.style.opacity = 0;
    winsGoal = null;
    showHighscore(false);
}