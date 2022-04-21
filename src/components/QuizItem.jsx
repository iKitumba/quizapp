import './quizitem.css';
import { useState, useEffect } from 'react';

const QuizItem = ({ data, setQuestionNumber, questionNumber, setStop }) => {
  const [className, setClassName] = useState('answer');
  const [quection, setQuection ] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const delay = (duraction, callback) => {
    setTimeout(() => {
      callback();
    }, duraction);
  }

  useEffect(() => {
      setQuection(data[questionNumber - 1])
    }, [data, questionNumber]);
  

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName('answer active');
    delay(3000, () => {
      setClassName(a.correct ? 'answer correct' : 'answer wrong');      
    });
    delay(6000, () => {
      if(a.correct) {
        setQuestionNumber(prev => prev === data.length ? 1 : prev + 1);
        setSelectedAnswer(null);
      } else {
        setStop(true);
      }
    })
  }

  return (
    <div className="quizItem">
      <div className="quizQuetion">
        {quection?.question}
      </div>
      <div className="quizAnswers">
      {quection?.answers.map(a => (
        <div 
          key={a.text}
          className={selectedAnswer === a ? className : 'answer'} 
          onClick={() => handleClick(a)}>{a.text}</div>
      ))}
      </div>
    </div>
  )
}

export default QuizItem;