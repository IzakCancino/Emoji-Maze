/**
 * Script for save the `GAMEMODE` and send it to `game.html`
 */


document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", (e) => {
        sessionStorage.setItem("gamemode", e.target[0].value);
    });
});