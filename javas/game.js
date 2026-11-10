"use strict"; //using stict mode to write clean and safe code
//defining sounds variables
const correct = new Audio("./sounds/correct.wav");
const wrong = new Audio("./sounds/wrong.wav");
const levelComplete = new Audio("./sounds/level-completion.wav");
const music = document.getElementById("background-music");
//for music to play whenever user clicks anywhere on page
if (music) {
    music.volume = 0.3;

    document.addEventListener("click", () =>{
        if(music.paused){
            music.play().catch(error => {
                console.log("music is prevented:", error);
            });
        }
    }, {once: true});
}


//defining loggedInUser in local storage
const loggedInUser = localStorage.getItem("loggedInUser");
if (!loggedInUser){
    window.location.href = "login.html";
}


const grid = document.getElementById("word-grid");  /*finds the grid*/
//making word and grid letters
const levels = [
    {
        columns: 6,
        words : [
    "BIRDS",
    "GRASS",
    "KIDS",
    "PICNIC",
    "PLAY",
    "SWING",
    "TREES"
],
gridLetters : [
    "S", "S", "D", "I", "K", "S",
    "Y", "W", "I", "C", "E", "C",
    "A", "Y", "I", "E", "E", "I",
    "L", "L", "R", "N", "C", "N",
    "P", "T", "T", "E", "G", "C",
    "S", "S", "A", "R", "G", "I",
    "B", "I", "R", "D", "S", "P"
        ]
    },
    //level 2
    {
        columns : 7,
        words : [
        "CALF",
        "CHICK",
        "CUB",
        "EAGLET",
        "FAWN",
        "KID",
        "LARVA",
        "KITTEN",
        "TADPOLE"
        ],
    gridLetters : [
        "Q", "R", "F", "C", "B", "C", "U",
        "B", "Q", "A", "K", "C", "H", "E", 
        "Y", "L", "W", "I", "L", "I", "L",
        "F", "T", "N", "T", "A", "C", "O",
        "C", "T", "R", "T", "R", "K", "P",
        "F", "U", "V", "E", "V", "I", "D",
        "F", "N", "B", "N", "A", "D", "A",
        "E", "A", "G", "L", "E", "T", "T",
    ]
},
   {
    columns: 7,
    words :[
    "ALARM",
    "AWAKE",
    "COFFEE",
    "COMMUTE",
    "DEW",
    "ENERGY",
    "MEAL",
    "SUNRISE",
    "YOGA"
    ],
gridLetters: [
    "C", "E", "N", "E", "R", "G", "Y",
    "S", "O", "M", "E", "A", "L", "E",
    "U", "U", "F", "D", "C", "E", "T",
    "N", "A", "E", "F", "K", "J", "U",
    "R", "W", "L", "A", "E", "Y", "M",
    "I", "O", "W", "A", "O", "E", "M",
    "S", "A", "F", "G", "R", "K", "O",
    "E", "N", "A", "D", "L", "M", "C"
   ]
},
   {
    columns: 9,
    words: [
    "BIOLOGY",
    "HISTORY",
    "ENGLISH",
    "MATHS",
    "SCIENCE",
    "GEOGRAPHY",
    "ART",
    "MUSIC"
   ],
gridLetters : [
    "T", "U", "S", "C", "I", "E", "N", "C", "E",
    "S", "H", "T", "A", "M", "A", "R", "T", "T",
    "Y", "E", "G", "T", "C", "I", "S", "U", "M",
    "W", "P", "B", "Z", "T", "W", "H", "U", "D",
    "H", "S", "I", "L", "G", "N", "E", "O", "O",
    "G", "E", "O", "G", "R", "A", "P", "H", "Y",
    "H", "I", "S", "Z", "U", "E", "N", "U", "F",
    "R", "B", "I", "O", "L", "O", "G", "Y", "G",
    "N", "X", "Y", "R", "O", "T", "S", "I", "H"
    ]
},
{
    columns : 8,
    words: [
    "TIGER",
    "ZEBRA",
    "LION",
    "SNAKE",
    "EAGLE",
    "HORSE",
    "WOLF",
    "BEAR",
    "DEER",
    "FROG"
    ],
gridLetters: [
    "T", "I", "G", "E", "R", "X", "Q", "Z",
    "A", "B", "R", "A", "E", "B", "E", "E",
    "L", "I", "O", "N", "D", "A", "A", "B",
    "S", "N", "A", "K", "E", "R", "G", "R",
    "H", "O", "R", "S", "E", "F", "L", "A",
    "W", "O", "L", "F", "Y", "R", "E", "R",
    "D", "E", "E", "R", "M", "O", "Q", "T",
    "F", "R", "O", "G", "S", "N", "A", "K"
   ]
}
];
//defining levels, scores and letters
let currentLevel = 0;
let letters = [];
let levelScore = 0;
let totalScore = 0;


const gameMessage = document.getElementById("game-message");
const scoreDisplay = document.getElementById("score");
const nextLevelButton = document.getElementById("next-level-button")


const foundWords = [];
let score = 0;


function loadLevel(){
    const level = levels[currentLevel]; 

    //clear the grid
    grid.innerHTML = "";

    //set the number of columns for this level
    grid.style.gridTemplateColumns = 
    `repeat(${level.columns}, 38px)`;

    const rows = Math.ceil(level.gridLetters.length / level.columns);

    grid.style.gridTemplateRows = 
    `repeat(${rows}, 38px)`;


    //create grid letters
    level.gridLetters.forEach((character) =>{
        const cell = document.createElement("div");
        cell.textContent = character;
        grid.appendChild(cell);
    });
    //update the letters variable
    letters = grid.querySelectorAll("div");

    //This gives cell a number based on its position in grid
    letters.forEach((letter, index) => {
    letter.dataset.index = index;
    });

    const wordList = document.getElementById("word-list");
    wordList.innerHTML = ""; //clear any existing content from the list

    //loops through an array and create a new html element and add on element inside another element
    level.words.forEach((word) => {
        const item = document.createElement("li");
        item.textContent = word;
        wordList.appendChild(item);
    });
gameMessage.textContent = "Find all the hidden words!";
gameMessage.className = "";
scoreDisplay.textContent = "Score:" + " " + levelScore;

//hidethe next level button from webpage for now
nextLevelButton.hidden = true;
}

let isSelecting = false;
let selectedLetters = [];
let tutorialRunning = false;
let selectionRowStep = null;
let selectionColStep = null;

loadLevel();



//writing a function to see if cells are selected in horizontal, vertical
//or diagonal position
function isStraightLine(selectedCells){
    /*check if cell length is less than 2 apply true*/
    if(selectedCells.length < 2){
        return true;
    }
    const columns = levels[currentLevel].columns;/*word search grid is 6 columns*/

    
    const firstIndex = Number(selectedCells[0].dataset.index);/*reads attribute from cells and convert it in number*/
    const lastIndex = Number(selectedCells[selectedLetters.length - 1].dataset.index);

    const firstRow = Math.floor(firstIndex / columns);  /*calculates the first row*/
    const firstCol = firstIndex % columns; /*calculates the first column*/

    const lastRow = Math.floor(lastIndex / columns); /*calculates 2nd row*/
    const lastCol = lastIndex % columns; /* calculates 2nd column*/

    const rowDifference = lastRow - firstRow;
    const colDifference = lastCol - firstCol;

    return(
        rowDifference === 0 ||
        colDifference === 0 ||
        Math.abs(rowDifference) === Math.abs(colDifference)
    );
}


/*creating a function that when user press mouse (which is event) then 
do isSelecting to true*/
grid.addEventListener("pointerdown", (event) =>{
    if(tutorialRunning) return;
    if(!event.target.matches(".word-grid div")){
        return;
    }
    event.preventDefault();

    isSelecting = true;
    selectedLetters = [];
    selectionRowStep = null;
    selectionColStep = null;

    if(event.target.matches(".word-grid div")){
        event.target.classList.add("selected");
        selectedLetters.push(event.target);
    }
});

/*here javasript recognise a letter when you press and drag the mouse*/
grid.addEventListener("pointerover", (event) =>{
    if(tutorialRunning) return;
    if (!isSelecting ||  !event.target.matches(".word-grid div")){
        return;
    }
    const currentCell = event.target;
    if (selectedLetters.includes(currentCell)){
        return;
    }

    const columns = levels[currentLevel].columns;
    /*calculates the number of row and column like we did in IsStraightLine function*/
    const currentIndex = Number(currentCell.dataset.index);
    const currentRow = Math.floor(currentIndex / columns);
    const currentCol = currentIndex % columns;

    const lastCell = selectedLetters[selectedLetters.length - 1];
    const lastIndex = Number (lastCell.dataset.index);

    const lastRow = Math.floor(lastIndex / columns);
    const lastCol = lastIndex % columns;

    const rowDifference = currentRow - lastRow;
    const colDifference = currentCol - lastCol;

    if(selectedLetters.length === 1){
        const isHorizontal = rowDifference === 0 && colDifference !== 0;
        const isVertical = colDifference === 0 && rowDifference !==0;
        const isDiagonal = Math.abs(rowDifference) === Math.abs(colDifference) &&
        rowDifference !== 0;

        /*if the code is neither vertical, horizontal not diagonal, stop here*/
        if(!isHorizontal && !isVertical && !isDiagonal){
            return;
        }
        /*direction memory, game uses this to check the next movemnet*/
        selectionRowStep = Math.sign(rowDifference);
        selectionColStep= Math.sign(colDifference);
    }else{
        if(
            rowDifference !== selectionRowStep || 
            colDifference !== selectionColStep
        ){
            return;
        }
    }
    currentCell.classList.add("selected");
    selectedLetters.push(currentCell);
});

/*check where the pointer is released*/
document.addEventListener("pointerup", () =>{
    isSelecting = false;
    
    const selectedWord = selectedLetters
    .map((letters) => letters.textContent.trim())
    .join(""); /*join the words into one string*/
    console.log(selectedWord);

    if(selectedLetters.length < 2){
        letters.forEach((letter) =>{
            letter.classList.remove("selected");
        });
        selectedLetters = [];
        return;
    }

    /*if the word is not in foundwords and is present in selectedWord push it in foundWords*/
    if(levels[currentLevel].words.includes(selectedWord)){
       if (foundWords.includes(selectedWord)){
           gameMessage.textContent = "You already found this word!";
           gameMessage.className = "warning-message";
        
    }else{
        foundWords.push(selectedWord);
        gameMessage.textContent = "Welldone! You found a new word";
        gameMessage.className = "success-message";
        correct.currentTime = 0;
        correct.play();

        /*adding scores*/
        levelScore += 10;
        totalScore += 10;
        scoreDisplay.textContent = "Score: " + levelScore;
        scoreDisplay.className = "score";

        const wordItems = document.querySelectorAll("#word-list li"); 

        //if the word matches the selected word marked it as found
        wordItems.forEach((item) => {
            if(item.textContent.trim() === selectedWord){
                item.classList.add("found");
            }
        });

        //check whether the player has found every word in the current level
        if(foundWords.length === levels[currentLevel].words.length){
            savePlayerScore(); //save the player score
            nextLevelButton.hidden = false;  //show next level button now
            gameMessage.textContent = "Congratulations! You have completed Level 1";//display msg
            gameMessage.className = "success-message";
            levelComplete.currentTime = 0;
            levelComplete.play(); //play sound
        }
    }
    } else{
        gameMessage.textContent = "Not a word! Try again.";
        gameMessage.className = "error-message";
        wrong.currentTime = 0;
        wrong.play();
    }

//clear the selected words after checking the answer
clearSelection();
});
//function to clear the currently selected letters
function clearSelection(){
     letters.forEach((letters) =>{
            letters.classList.remove("selected");  //remove the selected styling from every grid letter
});

//reset the selected letters array
    selectedLetters = [];

    //reset the starting row and column position
    selectionRowStep = null;
    selectionColStep = null;
}

//save players score in local storage
function savePlayerScore(){
    const loggedInUser = localStorage.getItem("loggedInUser");//retrieve teh email of currently logged-in user
    //retrieve all registered users from localstorage
    const storedUsers = JSON.parse( 
        localStorage.getItem("wordsearchUsers")
    ) || [];

    const currentUser = storedUsers.find(
        user => user.email === loggedInUser
    );
    //stop function if not loggedin user found
    if(!currentUser) return;
   //retrieve teh existing leaderboard score
    const scores = JSON.parse(
        localStorage.getItem("wordsearchScores")
    ) || [];

    //chcek whether this player already has a ledaerboard entry
    const existingScore = scores.find(
        player => player.email === loggedInUser
    );

    //if player already exists, update their score only if it is higher
    if(existingScore){
        if(totalScore > existingScore.score){
            existingScore.score = totalScore;
        }
    } else {//otherwise create a new leaderboard entry for user
        scores.push({
            email: loggedInUser,
            username: currentUser.username,
            score: totalScore
        });
    }

    //converts the score array into JSON and save it in local storage
    localStorage.setItem(
        "wordsearchScores",
        JSON.stringify(scores)
    );
}
//asynchronous function to demonstrate how to find a word
async function showLevelDemo(){

    //tutorial deminstration is running
    tutorialRunning = true;
    gameMessage.textContent = "watch how to find BIRDS";

    //these are position of word BIRDS in the grid letters
    const demoCells = [36, 37, 38, 39, 40].map(
        index => letters[index]
    );
    for(const cells of demoCells){
        cells.classList.add("tutorial-highlight");
        await new Promise(Resolve => setTimeout(Resolve, 450));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    //remove the highlights of demonstration
    demoCells.forEach(cell =>{
        cell.classList.remove("tutorial-highlight");
    });
    gameMessage.textContent = "Now your turn! Click and drag the mouse to select a word."
    tutorialRunning = false;
}

nextLevelButton.addEventListener("click", () => {
    //check whether another level is available
    if(currentLevel < levels.length - 1){
        currentLevel++;//move to next level
        levelScore = 0; //reset scores
        foundWords.length = 0;
        loadLevel(); //load a new level
        gameMessage.textContent="Welcome to level" + " " + (currentLevel + 1) + "!";
    } else {
    gameMessage.textContent = "congratulation! You have completed the whole game!"
    gameMessage.className = "success-message";
    nextLevelButton.hidden = true;
    levelComplete.currentTime = 0;
    levelComplete.play();

}
});
//start the tutorial demostration
showLevelDemo();