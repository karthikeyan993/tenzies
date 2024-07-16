import propTypes from "prop-types";

export default function Dice(props) {
  return (
    <button
      className={props.frozen ? "dice locked" : "dice"}
      onClick={() => props.handleDice(props.id)}
      aria-label={`Dice with value ${props.number}${
        props.frozen ? ", frozen" : " unfrozen"
      }`}
      aria-pressed={props.frozen}
    >
      {props.number}
    </button>
  );
}

Dice.propTypes = {
  id: propTypes.number,
  number: propTypes.number,
  handleDice: propTypes.func,
  frozen: propTypes.bool,
};
