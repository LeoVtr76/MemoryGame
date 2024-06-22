import PropTypes from "prop-types";
function GameOver({ onRetryClick }) {
  return (
    <div className="gameOver">
      <span>GameOver</span>
      <button onClick={onRetryClick}>Retry ?</button>
    </div>
  );
}
GameOver.propTypes = {
  onRetryClick: PropTypes.func.isRequired,
};
export default GameOver;
