const enterChoices = document.getElementById("enter-choices");
const choiceBtn = document.getElementById("choice-btn");
const rollBtn = document.getElementById("roll");
const resetBtn = document.getElementById("reset");
const resultDisplay = document.getElementById("result");
const choices = document.getElementById("choices");
const choicesDisplay = document.getElementById("choice-display");
const choicesList = document.getElementById("choices-list");
const messageDisplay = document.getElementById("message");

const imgDisplay = document.getElementById("images");

const diceImages = [
  "assets/images/diceone.png",
  "assets/images/dicetwo.png",
  "assets/images/dicethree.png",
  "assets/images/dicefour.png",
  "assets/images/dicefive.png",
  "assets/images/dicesix.png",
];

const diceman = "assets/images/diceman.png";
const diceroll = "assets/images/diceroll.gif";

let choicesArr = [];

const badChoices = [
  "clean the kitchen",
  "do the laundry",
  "wash the dishes",
  "clean the bathroom",
  "clean the floors",
  "change the bed",
  "clean the windows",
  "clean out the fridge",
];

const goodChoices = [
  "go for a walk",
  "read a book",
  "play a game",
  "take a nap",
  "listen to music",
  "write some code",
  "decide what you actually want to do with your life",
];

choiceBtn.addEventListener("click", () => {
  choicesArr = choices.value
    .trim()
    .split(",")
    .filter((choice) => choice.trim() !== "");

  if (choicesArr.length == 0) {
    displayMessage("Please enter at least one choice...");
    return;
  } else if (choicesArr.length > 6) {
    displayMessage("Please enter at most six choices...");
    return;
  }

  let choicesToFill = 6 - choicesArr.length;
  if (choicesArr.length < 6) {
    displayMessage("I've added some choices for you...");
    let randomBadChoice =
      badChoices[Math.floor(Math.random() * badChoices.length)];
    choicesArr.push(randomBadChoice);
    choicesToFill--;
    for (let i = 0; i < choicesToFill; i++) {
      let randomIndex = Math.floor(Math.random() * goodChoices.length);
      let randomGoodChoice = goodChoices.splice(randomIndex, 1);
      choicesArr.push(randomGoodChoice[0]);
    }
  }

  enterChoices.style.display = "none";
  displayChoices();
});

const displayChoices = () => {
  choicesDisplay.style.display = "flex";
  choicesList.innerHTML = "";
  choicesArr.forEach((choice) => {
    let item = document.createElement("li");
    choiceText = choice.charAt(0).toUpperCase() + choice.slice(1);
    item.innerHTML = choiceText;
    choicesList.appendChild(item);
  });
};

const rollDice = () => {
  imgDisplay.src = diceroll;
  let randomIndex = Math.floor(Math.random() * diceImages.length);
  setTimeout(() => {
    imgDisplay.src = diceImages[randomIndex];
  }, 2000);
  setTimeout(() => {
    resultDisplay.style.display = "block";
    resultDisplay.innerHTML = choicesArr[randomIndex];
    resetBtn.innerHTML = "Try Again";
    choicesDisplay.style.display = "none";
  }, 2500);
};

const displayMessage = (message) => {
  messageDisplay.style.display = "block";
  messageDisplay.innerHTML = message;
  setTimeout(() => {
    messageDisplay.innerHTML = "";
    messageDisplay.style.display = "none";
  }, 2000);
};

rollBtn.addEventListener("click", rollDice);
resetBtn.addEventListener("click", () => {
  location.reload();
});
