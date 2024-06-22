import Proptypes from "prop-types";
function Header({ score, bestScore }) {
  return (
    <div className="header">
      <div className="title">
        <h1>Memory Game</h1>
      </div>
      <div className="score">
        <div className="player-score">
          <span>Score : {score}</span>
        </div>
        <div className="best-score">
          <span>Best-Score : {bestScore}</span>
        </div>
      </div>
    </div>
  );
}
Header.propTypes = {
  score: Proptypes.int,
  bestScore: Proptypes.int,
};
export default Header;
