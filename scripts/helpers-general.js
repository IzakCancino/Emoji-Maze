/**
 * Script with general use functions
 */


/**
 * Updates the game clock
 * @param {Boolean} [update=true] Determinate if update it with a new value (`true`) or not (`false`)
 */
function updateClock(update=true) {
    // Use the actual time
    if (update)
    {
        time.end = new Date();
    }

    // Calculate the time with format `00:00`
    let change = Math.floor((time.end - time.start) / 1000);
    let module = change % 60;
    clock.innerHTML = Math.floor(change / 60) + ":" + (module < 10 ? "0" + module : module);

    // Check if the game has been won
    if (wins != winsGoal)
    {   
        // Recall it in one second
        setTimeout(updateClock, 1000)
    }
    else
    {
        // Return the time in a object
        return {
            min: Math.floor(change / 60),
            sec: module
        };
    }
}

/**
 * Randomizes a number between a range
 * @param {Number} min The minimum inclusive value
 * @param {Number} max The maximum inclusive value
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Duplicate a `game` object for do it independent for calcules
 * @param {Object} obj `game` object to copy
 */
function copy(obj) {
    let clone = {};
    
    clone["maze"] = obj["maze"].map(row => row.slice());
    clone["entities"] = obj["entities"];

    return clone;
}