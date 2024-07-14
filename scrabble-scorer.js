// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let word = "";

function initialPrompt() {
   console.log("Let's play some scrabble!\n")
   word = input.question("Enter a word to score: ");
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }
 oldScrabbleScorer(word);

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let simpleScorer = 0;
function simpleScorerFunc(word) {
   word = word.toUpperCase();
   for (i = 0; i < word.length; i++){
      simpleScorer++;
   }
   return simpleScorer;
}
simpleScorerFunc(word);

let vowelBonusScorer = 0;
function vowelBonusScorerFunc(word) {
   word = word.toUpperCase();
   let vowels = 'AEIOU';
   let consonants = 'BCDFGHJKLMNPQRSTVWXYZ'
   let wordNumVowels = 0;
   let wordNumConsonants = 0;

   for (i = 0; i < word.length; i++){
      if (vowels.includes(word[i])) {
         wordNumVowels++;
      } else if (consonants.includes(word[i])) {
         wordNumConsonants++;
      }  
   }
   vowelBonusScorer = (wordNumVowels * 3) + (wordNumConsonants * 1);
   return vowelBonusScorer;
}
vowelBonusScorerFunc(word);

const scoringAlgorithms = [];

let scoringOptionsOne = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorerFunc(word)
};

let scoringOptionsTwo = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorerFunc(word)
};

let scoringOptionsThree = {
   name: "SCrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: oldScrabbleScorer(word)
};

scoringAlgorithms.push(scoringOptionsOne);
scoringAlgorithms.push(scoringOptionsTwo);
scoringAlgorithms.push(scoringOptionsThree);

let selectScoringOption = "";
function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?");
   console.log(`
0 - ${scoringOptionsOne.name}: ${scoringOptionsOne.description}\n
1 - ${scoringOptionsTwo.name}: ${scoringOptionsTwo.description}\n
2 - ${scoringOptionsThree.name}: ${scoringOptionsThree.description}
`);
   selectScoringOption = input.question("Enter 0, 1, or 2: ");

   if (selectScoringOption === "0") {
      console.log(`Score for '${word}': ${simpleScorerFunc(word)}`);
   } else if (selectScoringOption === "1") {
         console.log(`Score for '${word}': ${vowelBonusScorerFunc(word)}`);
   } else if (selectScoringOption === "2") {
         console.log(oldScrabbleScorer(word));
   }
}

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

let newPointStructure;

let scrabbleScorer;

function transform() {};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
