let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#btn");
let msg = document.querySelector(".msg-container");
let newGameBtn = document.querySelector("#newbtn");

let turnO = true; //playerX , playerO
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msg.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO === true) {
      box.innerText = "O";
      box.style.color = "blue";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "brown";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations ,Winner is ${winner}`;
  msg.classList.remove("hide");
  disableBoxes(); 
};

const isTie = () => {
  for (let box of boxes) {
    if (box.innerText === "") {
      return false;
    }
  }
  return true;
};

const checkWinner = () => {
  let winnerFound = false;

  for (pattern of winPatterns) {
    // console.log(pattern[0] , pattern[1], pattern[2]);
    // console.log(boxes[pattern[0]].innerText , boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
        winnerFound = true;       
      }
    }
  }

  if (!winnerFound && isTie()) {
    msg.innerText = "It's a Tie!";
    msg.classList.remove("hide");
    disableBoxes();
  }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
