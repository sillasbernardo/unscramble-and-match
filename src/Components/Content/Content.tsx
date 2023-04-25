import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import "./Content.scss";
import MatchingGif from "../../assets/matching.gif";
import { searchContentActions } from "../../Store/SearchContent";

type StateType = {
  searchContent: {
    searchValue: string;
    isSearching: boolean;
    isResults: boolean;
  };
};

const Content = () => {
  const searchContent = useSelector((state: StateType) => state.searchContent);

  const [possibleMatch, setPossibleMatch] = useState("");

  const reduxDispatch = useDispatch();

  useEffect(() => {
    if (searchContent.isSearching) {
      fetch("/words.txt")
        .then((response) => response.text())
        .then((data) => {
          const wordsArray = data.split(/\r?\n/); // Split into array of words

          const scrambledLetters = [...searchContent.searchValue]; // Array of typed letters

          // Find words that has these letters to reduce dictionary size
          const matchedWords = wordsArray.filter(word => {
            let counter = 0;

            scrambledLetters.forEach(letter => {
              if (word.includes(letter)){
                counter++;
              }
            })

            if (counter === scrambledLetters.length){
              return word;
            }
          })

          // Take the word and the input letters, check if each word letter is equal to any of the input letters
          const foundWord = matchedWords.filter(word => {
            let scrambledLettersCopy = scrambledLetters.slice(); // copy of original typed letters

            let matchedWordArray: string[] = [];

            [...word].forEach(dicWordLetter => { // f loat
              let checkLetter = true; // stop scrambledLettersCopy's for each
              let checkedLetters: string[] = []; // store checked letters

              scrambledLettersCopy.forEach(inputLetter => { // f o o t
                if (inputLetter === dicWordLetter && checkLetter){
                  checkedLetters.forEach(e => {
                    if (e !== dicWordLetter){
                      matchedWordArray.push(dicWordLetter);
                      checkLetter = false;
                      checkedLetters.push(inputLetter);
                    }
                  })
                }
              })
            })

            const matchedWords = matchedWordArray.reduce((prev, current) => prev + current);

            console.log(matchedWords)
            return word === matchedWords;
          })


          // If yes, save this letter somewhere, remove it from the input letters and test next word letter

          // Take the letters saved somewhere, merge them and show to user

          /* // Match all words that contain all the informed letters
          const matchedWords = wordsArray.filter((word) => {
            let wordFound = false;

            let counter = 0;
            scrambledLetters.forEach((letter) => {
              if (!word.includes(letter)) {
                wordFound = false;
                return;
              }

              counter++;
              if (counter === scrambledLetters.length) {
                wordFound = true;
              }
            });

            if (wordFound) {
              return word; // return every word that contains at least the informed letters
            }
          });

          // Match the exact word that only has the informed letters
          let foundWord: string[] = []; // Array of found word letters
          matchedWords.forEach((word) => {
            const wordArray = [...word]; // Array of word letters
            let scrambledLettersCopy = scrambledLetters.slice(); // Copy of typed letters

            if (foundWord.length !== scrambledLettersCopy.length) { // foundWord wasn't found yet
              wordArray.forEach((wordLetter) => {
                for (let i = 0; i < scrambledLettersCopy.length; i++) {
                  if (wordLetter === scrambledLettersCopy[i] && word.length === scrambledLetters.length) {
                    console.log(wordLetter, scrambledLettersCopy[i])
                    console.log(word)
                    console.log(word.length, scrambledLetters.length)
                    scrambledLettersCopy = scrambledLettersCopy.filter((letter) => letter !== scrambledLettersCopy[i]); // remove letter from typed so it's not matched again (this ensures double letters are evaluated)
                    foundWord.push(wordLetter);
                    break;
                  }

                  if (!foundWord.length){ // set foundWord to empty array if some letters matched but wasn't the word
                    foundWord = [];
                  }
                }

              });
            }
          }); */
        });

      reduxDispatch(searchContentActions.stopSearching());
    }
  }, [searchContent.isSearching, possibleMatch]);

  return (
    <main className="main">
      <div className="main__scrambled">
        <h2>Scrambled letters</h2>
        {searchContent.searchValue ? (
          <p>{searchContent.searchValue}</p>
        ) : (
          <span className="blinking-cursor"></span>
        )}
      </div>
      {searchContent.isResults && (
        <div className="main__match-test">
          <div className="main__mt__matched-words">
            <h2>Possible Match</h2>
            {possibleMatch ? <p>{possibleMatch}</p> : <p>Loading...</p>}
            <h2>Other Matched Words</h2>
            <p>Elepha</p>
            <p>Elepha</p>
            <p>Elepha</p>
            <p>Elepha</p>
            <p>Elepha</p>
            <p>Elepha</p>
          </div>
          <div className="main__mt__matching">
            <img src={MatchingGif} />
            <p>Matching...</p>
          </div>
          <p>Elephant</p>
        </div>
      )}
    </main>
  );
};

export default Content;
