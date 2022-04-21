import { useState, useEffect, useMemo } from 'react';
import './app.css';
import QuizItem from './components/QuizItem';
import { moneyList } from './utils/modeyList';
import { data } from './utils/data';
import Timer from './components/Timer';
import Start from './components/Start';

const App = () => {
  const [userName, setUserName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("KZ 0");

  const moneyPyradim = useMemo(() => moneyList, []);

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyradim.find(m => m.id === questionNumber - 1).amount);
  }, [moneyPyradim ,questionNumber]);

  return (
    <div className="app">
      { userName ? (
        <>
          <main className="main">
          { stop ? (
            <div className='endText'>
              <h1>{ userName } you earned: { earned }</h1> 
              <button 
                className='restart'
                onClick={() => {
                  window.location.reload();
                }}
                >Restart</button>
            </div>
            ): (
            <>
              <div className="top">
                <div className='timer'>
                  <Timer setStop={setStop} questionNumber={questionNumber} />
                </div>
              </div>
              <div className="bottom">
                <QuizItem 
                  data={data} 
                  setQuestionNumber={setQuestionNumber} 
                  setStop={setStop}
                  questionNumber={questionNumber}
                />
              </div>
            </>     
          ) }

        </main>
        <aside className="money">
          <ul className="moneyList">
            { moneyPyradim.map(m => (
            <li key={m.id} className={ m.id === questionNumber ? 'moneyItem active' : 'moneyItem' }>
              <span className="moneyNumber">{m.id}</span>
              <strong className="moneyAmount">{m.amount}</strong>
            </li>)) 
            }
          </ul>
        </aside>
        </>
      ) : ( <Start setUserName={setUserName} /> ) }
    </div>
  )
}

export default App;