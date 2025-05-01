import React, { useState, useEffect } from 'react';
import Description from './components/Description/Description';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';
import css from './App.module.css';

const App = () => {
  // Використовуємо функцію для ініціалізації стану з localStorage
  const [feedback, setFeedback] = useState(() => {
    try {
      const savedFeedback = localStorage.getItem('feedback');
      return savedFeedback
        ? JSON.parse(savedFeedback)
        : { good: 0, neutral: 0, bad: 0 };
    } catch (error) {
      console.error('Error loading feedback from localStorage:', error);
      return { good: 0, neutral: 0, bad: 0 };
    }
  });

  const { good, neutral, bad } = feedback;

  // Зберігаємо стан у localStorage при кожній зміні feedback
  useEffect(() => {
    try {
      localStorage.setItem('feedback', JSON.stringify(feedback));
    } catch (error) {
      console.error('Error saving feedback to localStorage:', error);
    }
  }, [feedback]);

  const updateFeedback = feedbackType => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  const totalFeedback = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();
  const options = Object.keys(feedback); // Отримуємо ключі стану як опції для кнопок

  return (
    <div className={css.container}>
      <section className={css.section}>
        <Description />
      </section>

      <section className={css.section}>
        <h2>Leave your feedback</h2>
        <Options
          options={options}
          onUpdate={updateFeedback} // Передаємо функцію оновлення
          onReset={resetFeedback} // Передаємо функцію скидання
          totalFeedback={totalFeedback} // Передаємо загальну кількість для умовного рендерингу кнопки Reset
        />
      </section>

      <section className={css.section}>
        <h2>Statistics</h2> {/* Заголовок секції */}
        {totalFeedback > 0 ? (
          <Feedback // Використовуємо Feedback компонент для відображення статистики
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </section>
    </div>
  );
};

export default App;
