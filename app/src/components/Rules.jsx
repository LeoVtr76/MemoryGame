import PropTypes from "prop-types";

function Rules({ onClose }) {
  return (
    <div className="rules-popup">
      <div className="rules-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>Memory Challenge Rules</h2>
        <p>Welcome to the Memory Challenge!</p>
        <p>
          In this game, your goal is to click on each image displayed on the
          cards without clicking on the same image twice in a row.
        </p>
        <p>
          As you progress, more cards with new images will be added to increase
          the challenge.
        </p>
      </div>
    </div>
  );
}
Rules.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default Rules;
