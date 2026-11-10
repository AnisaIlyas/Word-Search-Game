"use strict";

//get leaderboard table body
const leaderboardBody = document.getElementById("leaderboard-body");

//Retrieve saved scores
const scores = JSON.parse(
    localStorage.getItem("wordsearchScores")
) || [];

//sort the scores
scores.sort((a,b) => b.score - a.score);

//Display scores in leaderboard
scores.forEach((player, index) => {
    //create a new table
    const row = document.createElement("tr");

    //create ranking column
    const rankCell = document.createElement("td");
    rankCell.textContent = index + 1;

    //create username column
    const usernameCell  = document.createElement("td");
    usernameCell.textContent  = player.username;

    //create score column
    const scoreCell = document.createElement("td");
    scoreCell.textContent = player.score;

    //Add columns to the row
    row.appendChild(rankCell);
    row.appendChild(usernameCell);
    row.appendChild(scoreCell);

    //Add row to the leaderboard
    leaderboardBody.appendChild(row);
    
});


