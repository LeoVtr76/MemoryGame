import PropTypes from "prop-types";
function Card({ card, onCardClick }) {
  return (
    <div className="card" onClick={() => onCardClick(card.id)}>
      <img src={card.image} alt="character image" draggable="false" />
      <span>{card.name}</span>
    </div>
  );
}
Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  onCardClick: PropTypes.func.isRequired,
};
export default Card;
