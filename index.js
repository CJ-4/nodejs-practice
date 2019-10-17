let score = 0;

let scrabble = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoreFunction: function(word) {
    for (let i = 0; i < word.length; i++) {
      letter = word[i];
      score += newScoreKey[letter];
    }
    return score;
  }
};

let easy = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoreFunction: function(term) {
    for (let i = 0; i < term.length; i++) {
      if (term[i] !== " ") {
        score += 1;
      }
    }
    return score;
  }
};

let vowels = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1pt.",
  scoreFunction: function(term) {
    let vowelsArray = ["A", "E", "I", "O", "U"];
    for (let i = 0; i < term.length; i++) {
      for (let j = 0; j < vowelsArray.length; j++) {
        if (term[i] == vowelsArray[j]) {
          score += 2;
        }
      }
      score += 1;
    }
    return score;
  }
};

let newScoreKey = {};
let transform = function(key) {
  for (let item in key) {
    for (let i = 0; i < key[item].length; i++) {
      newScoreKey[key[item][i].toLowerCase()] = Number(item);
    }
  }
  return newScoreKey;
};

// Code your initialPrompt function here:
const input = require("readline-sync");
let initialPrompt = function() {
  let pickOne = input.question(
    "Welcome to the Scrabble score calculator. Enter Stop to quit.\nWhich scoring algorithm would you like to use?\n0 - Scrabble: The traditional scoring algorithm.\n1 - Simple Score: Each letter is worth 1 point.\n2 - Bonus Vowels: Vowels are 3 pts, consonants are 1pt\nEnter 0,1,2:"
  );
  pickOne = Number(pickOne);

  if (pickOne > 2) {
    pickOne = 0;
  }
  console.log();
  return `Chosen: ${pickOne.scoreFunction}`;
};

// Here is the oldScoreKey object:
const oldScoreKey = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"]
};

// Use the transform function to create the newScoreKey object here:
newScoreKey = transform(oldScoreKey);
newScoreKey[" "] = 0;

// Create your scoringAlgorithms array here:
let scoringAlgorithms = [scrabble, easy, vowels];

let runProgram = function() {
  let choice = initialPrompt();
  console.log("Choice = ", choice);
  const input2 = require("readline-sync");
  let word = "";
  while (word != "Stop") {
    word = input2.question("Enter a word to be scored:");
    if (word == "Stop") {
      console.log("Have a nice day");
      return;
    }
    let term = word.toLowerCase().split("");
    console.log(
      `Score for ${word}: ${scoringAlgorithms[choice].scoreFunction}`
    );
  }
};

// Call the runProgram function here:
runProgram();
