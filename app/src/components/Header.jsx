import Proptypes from "prop-types";
import logo from "../assets/logo.png";
function Header({ score, bestScore }) {
  return (
    <div className="header">
      <div className="title">
        <img src={logo} alt="" draggable="false" />
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
