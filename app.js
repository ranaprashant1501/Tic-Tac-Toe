let boxes = document.querySelectorAll(".box"); //array of every box
let turnx = true; //turn starts with X

let msg_container = document.querySelector(".msg-container"); // Winner message container(winner + newgame button)
let winner_msg = document.querySelector("#winner-msg");   // Winner Message

let newGameButton = document.querySelector("#new-game");
let resetButton = document.querySelector("#reset");


// All the pattern of winning
const winPattern = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];


// Event listener for playing the game
let count = 0; // Check if no. of boxes clicked
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turnx) {
            box.innerHTML = "X";
            box.style.color = "#5C573E";
            turnx = false;
        } else {
            box.innerHTML = "O";
            box.style.color = "#2E273F"
            turnx = true;
        }

        count++;
        // After clicking in a box, no more clicks in the same box
        box.disabled = true;
        const won = checkWin();

        //If there is no win
        if (count === 9 && !won) {
            draw();
        }
    })
});


// Checks who's the winner 
const checkWin = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerHTML;
        let pos2 = boxes[pattern[1]].innerHTML;
        let pos3 = boxes[pattern[2]].innerHTML;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
}

// Pop up for the winner message
const showWinner = (winner) => {
    winner_msg.innerText = `Congratulations!!!, Winner is ${winner}`;
    msg_container.classList.remove("hide");
    disableButtons();
};


// When its a draw
const draw = () => {
    winner_msg.innerText = `It's a Draw!`
    msg_container.classList.remove("hide");
    disableButtons();
}


// After a win, no more click in the game
const disableButtons = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// Restarting the Game
const newgame = () => {
    turnx = true;
    count = 0;
    enableButtons();
    msg_container.classList.add("hide");
}
const enableButtons = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
newGameButton.addEventListener("click", newgame);

// To reset the Game
resetButton.addEventListener("click", newgame);

