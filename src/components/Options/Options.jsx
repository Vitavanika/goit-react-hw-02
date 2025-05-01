import css from './Options.module.css';

const Options = ({ options, onUpdate, onReset, totalFeedback }) => {
  return (
    <div className={css.optionsContainer}>
      {options.map(option => (
        <button
          key={option}
          type="button"
          className={css.button}
          onClick={() => onUpdate(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}

      {totalFeedback > 0 && (
        <button
          type="button"
          className={`${css.button} ${css.resetButton}`}
          onClick={onReset}
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default Options;
