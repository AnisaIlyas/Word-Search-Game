/*Adding sound to the game when user clicks anywhere on the screen*/
const music = document.querySelector("audio");
document.addEventListener("click", () => {
    music.play();
}, {once: true});
