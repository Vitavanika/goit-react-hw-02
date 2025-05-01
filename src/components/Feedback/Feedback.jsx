import css from './Feedback.module.css';

const Feedback = ({ good, neutral, bad, total, positivePercentage }) => {
  return (
    <ul className={css.statsList}>
      <li className={css.statItem}>Good: {good}</li>
      <li className={css.statItem}>Neutral: {neutral}</li>
      <li className={css.statItem}>Bad: {bad}</li>
      <li className={css.statItem}>Total: {total}</li>
      <li className={css.statItem}>Positive feedback: {positivePercentage}%</li>
    </ul>
  );
};

export default Feedback;
