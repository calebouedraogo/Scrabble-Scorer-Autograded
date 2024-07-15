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

function simpleScorer(word) {
   word = word.toUpperCase();
   let simpleScore = 0;
   for (let i = 0; i < word.length; i++){
      simpleScore++;
   }
   return simpleScore;
}
simpleScorer(word);

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let vowels = 'AEIOU';
   let consonants = 'BCDFGHJKLMNPQRSTVWXYZ'
   let wordNumVowels = 0;
   let wordNumConsonants = 0;

   for (let i = 0; i < word.length; i++){
      if (vowels.includes(word[i])) {
         wordNumVowels++;
      } else if (consonants.includes(word[i])) {
         wordNumConsonants++;
      }  
   }
   let vowelBonusScore = (wordNumVowels * 3) + (wordNumConsonants * 1);
   return vowelBonusScore;
}
vowelBonusScorer(word);

const scoringAlgorithms = [
  {name: "Simple Score", description: "Each letter is worth 1 point.", scorerFunction: simpleScorer},
  {name: "Bonus Vowels", description: "Vowels are 3 pts, consonants are 1 pt.", scorerFunction: vowelBonusScorer},
  {name: "SCrabble", description: "The traditional scoring algorithm.", scorerFunction: scrabbleScorer}
];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?");
   console.log(`
0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n
1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n
2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
`);
   let selectScoringOption = input.question("Enter 0, 1, or 2: ");

   if (selectScoringOption === "0") {
      console.log(`Score for '${word}': ${scoringAlgorithms[0].scorerFunction(word)}`);
   } else if (selectScoringOption === "1") {
         console.log(`Score for '${word}': ${scoringAlgorithms[1].scorerFunction(word)}`);
   } else if (selectScoringOption === "2") {
         console.log(scoringAlgorithms[2].scorerFunction(word));
   } else {
      console.log(`Invalid Input! Try again\n`);
      return scorerPrompt(word);
   }
}

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

function transform(oldPointStructure) {
   let newObject = {};
   for (let item in oldPointStructure) {
      for (i = 0; i < oldPointStructure[item].length; i++) {
         newObject[oldPointStructure[item][i].toLowerCase()] = Number(item);
      }
   }
   return newObject;
}
transform(oldPointStructure);

let newPointStructure = transform(oldPointStructure);

function scrabbleScorer (word) {
   word = word.toLowerCase();
   let newScore = 0;
   for (let i = 0; i < word.length; i++) {
      for (let keys in newPointStructure) {
         if (keys.includes(word[i])) {
      newScore += newPointStructure[keys];
         }
      }
   }
   return newScore;
};
scrabbleScorer(word);

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
