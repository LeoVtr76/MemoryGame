import GameBoard from "./GameBoard";
import Header from "./Header";
import GameOver from "./GameOver";
import Rules from "./Rules";
import backgroundMusic from "../assets/sounds/backgroundMusic.mp3";
import clickSound from "../assets/sounds/click.mp3";
import musicOnIcon from "../assets/svg/musicOn.svg";
import musicOffIcon from "../assets/svg/musicOff.svg";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
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
  const [showRules, setShowRules] = useState(false);
  const [isMusic, setIsMusic] = useState(false);
  const [isSound, setIsSound] = useState(true);
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
  const playSound = () => {
    if (isSound) {
      new Audio(clickSound).play();
    }
  };
  const handleCardClick = (cardId) => {
    playSound();
    if (playerInput.indexOf(cardId) > -1) {
      if (bestScore < score) {
        setBestScore(score);
      }
      setGameOver(true);
    } else {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        setPlayerInput((prevPlayerInput) => [...prevPlayerInput, cardId]);
        const shuffled = cards.slice().sort(() => Math.random() - 0.5);
        setCards(shuffled);
        if (newScore === scoreGoal) {
          setLevel((prevLevel) => prevLevel + 1);
          setScoreGoal(scoreGoal + firstCardNumb - 2 + (level + 1) * 2);
        }
        return newScore;
      });
    }
  };
  const handleMusic = () => {
    playSound();
    setIsMusic(!isMusic);
  };
  const handleSound = () => {
    playSound();
    setIsSound(!isSound);
  };
  const handleRetryClick = () => {
    playSound();
    setLevel(1);
    setScore(0);
    setScoreGoal(firstCardNumb - 2 + 1 * 2);
    setPlayerInput([]);
    setGameOver(false);
  };
  const toggleRulesPopup = () => {
    playSound();
    setShowRules(!showRules);
  };
  return (
    <>
      {isMusic && <audio src={backgroundMusic} loop autoPlay />}
      {gameOver && (
        <>
          <div className="barrer"></div>
          <GameOver onRetryClick={handleRetryClick} />
        </>
      )}
      <>
        <Header score={score} bestScore={bestScore} />
        <GameBoard cards={cards} onCardClick={handleCardClick} />
        {showRules && <Rules onClose={toggleRulesPopup} />}

        <button className="rules-btn" onClick={toggleRulesPopup}>
          ?
        </button>
        <button className="sound-btn" onClick={handleSound}>
          {isSound ? (
            <FontAwesomeIcon icon={faVolumeHigh} className="sound-icon" />
          ) : (
            <FontAwesomeIcon icon={faVolumeMute} className="sound-icon" />
          )}
        </button>
        <button className="music-btn" onClick={() => handleMusic()}>
          {isMusic ? (
            <img src={musicOnIcon} alt="Music On" className="music-icon" />
          ) : (
            <img src={musicOffIcon} alt="Music Off" className="music-icon" />
          )}
        </button>
      </>
    </>
  );
}
export default Game;
