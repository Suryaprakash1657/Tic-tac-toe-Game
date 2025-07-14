let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; //playerO starts by default

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Function to reset the game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Event listener for box clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Only allow if box is empty
            box.innerText = turnO ? "O" : "X";
            turnO = !turnO; // Toggle turns
            box.disabled = true;
            checkWinner();
        }
    });
});

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Function to enable all boxes and reset text
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Function to show the winner and disable further moves
const showWinner = (winner) => {
    msg.innerText = `Congrats, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check if there's a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;

        // Check if the values are the same and not empty
        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }
    // Check if all boxes are filled (draw condition)
    if (Array.from(boxes).every(box => box.innerText !== "")) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
    }
};

// Event listeners for reset and new game buttons
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
