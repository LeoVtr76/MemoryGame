import GameBoard from "./GameBoard";
import Header from "./Header";
import GameOver from "./GameOver";
import { useState, useEffect } from "react";

function Game() {
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [playerInput, setPlayerInput] = useState([]);
  const [cards, setCards] = useState([]);
  let randomNumber = Math.floor(Math.random() * 820) + 1;
  let firstCardNumb = 4;
  const [scoreGoal, setScoreGoal] = useState(firstCardNumb - 2 + level * 2);
  useEffect(() => {
    const fetchCards = async () => {
      const cardData = [];

      for (
        let i = randomNumber;
        i < randomNumber + (firstCardNumb - 2 + level * 2);
        i++
      ) {
        let random = Math.floor(Math.random() * 820) + 1;
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${random}`
        );
        const result = await response.json();
        cardData.push(result);
      }
      setCards(cardData);
    };
    fetchCards();
  }, [level]);
  const handleCardClick = (cardId) => {
    console.log(playerInput);
    if (playerInput.indexOf(cardId) > -1) {
      if (bestScore < score) {
        setBestScore(score);
      }
      setGameOver(true);
    } else {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        setPlayerInput((prevPlayerInput) => [...prevPlayerInput, cardId]);
        if (newScore === scoreGoal) {
          setLevel((prevLevel) => prevLevel + 1);
          setScoreGoal(scoreGoal + firstCardNumb - 2 + (level + 1) * 2);
        }
        return newScore;
      });
    }
  };
  const handleRetryClick = () => {
    setLevel(1);
    setScore(0);
    setPlayerInput([]);
    setGameOver(false);
  };
  return (
    <>
      {gameOver ? (
        <GameOver onRetryClick={handleRetryClick} />
      ) : (
        <>
          <Header score={score} bestScore={bestScore} />
          <GameBoard cards={cards} onCardClick={handleCardClick} />
        </>
      )}
    </>
  );
}
export default Game;
