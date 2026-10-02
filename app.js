let boxes = document.querySelectorAll(".box");

let turnx = true;

let msg_container = document.querySelector(".msg-container");
let winner_msg = document.querySelector("#winner-msg");

let newGameButton = document.querySelector("#new-game");
let resetButton = document.querySelector("#reset");

const winPattern = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turnx) {
            box.innerHTML = "X";
            turnx = false;
        } else {
            box.innerHTML = "O";
            turnx = true;
        }

        box.disabled = true;
        checkWin();
    })
});

const checkWin = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerHTML;
        let pos2 = boxes[pattern[1]].innerHTML;
        let pos3 = boxes[pattern[2]].innerHTML;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log(`winner is ${pos1}`);

                showWinner(pos1);
            }
        }
    }
}

const showWinner = (winner) => {
    winner_msg.innerText = `Congratulations, Winner is ${winner}`;
    msg_container.classList.remove("hide");
    disableButtons();
};

const disableButtons = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableButtons = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}


const newgame = () => {
    turnx = true;
    enableButtons();
    msg_container.classList.add("hide");
}

newGameButton.addEventListener("click", newgame);
resetButton.addEventListener("click", newgame);

