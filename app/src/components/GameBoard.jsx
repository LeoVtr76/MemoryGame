import Card from "./Card";
import PropTypes from "prop-types";
function GameBoard({ cards, onCardClick }) {
  return (
    <div className="container">
      {cards.length > 0 ? (
        <>
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              onCardClick={() => onCardClick(card.id)}
            />
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
GameBoard.propTypes = {
  cards: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
export default GameBoard;
