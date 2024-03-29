import React from "react";
import "./app.css";
import QuizItem from "./components/QuizItem";
import { moneyList } from "./utils/modeyList";
import { questions } from "./utils/data";
import Timer from "./components/Timer";
import Start from "./components/Start";
import { Coins } from "@phosphor-icons/react";
import { useMedia } from "./hooks/useMedia";

const App = () => {
  const matchMedia = useMedia("(max-width: 856px)");
  const [userName, setUserName] = React.useState(null);
  const [questionNumber, setQuestionNumber] = React.useState(1);
  const [stop, setStop] = React.useState(false);
  const [earned, setEarned] = React.useState("KZ 0");
  const [menuOpened, setMenuOpened] = React.useState(false);

  const toggleMenuOpened = () => {
    setMenuOpened((prev) => !prev);
  };

  const moneyPyradim = React.useMemo(() => moneyList, []);

  React.useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyradim.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyradim, questionNumber]);

  return (
    <div className="app animeLeft">
      {userName ? (
        <>
          {matchMedia && (
            <button
              onPointerDown={matchMedia ? toggleMenuOpened : () => {}}
              className="moneyButtonList"
            >
              <Coins color="#020230" weight="bold" size={24} />
            </button>
          )}
          <main className="main">
            {stop ? (
              <div className="endText">
                <h1>
                  {userName} you earned: {earned}
                </h1>
                <button
                  className="restart"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Restart
                </button>
              </div>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <QuizItem
                    data={questions}
                    setQuestionNumber={setQuestionNumber}
                    setStop={setStop}
                    questionNumber={questionNumber}
                  />
                </div>
              </>
            )}
          </main>
          <aside
            className="money animeLeft"
            style={{ zIndex: menuOpened ? 1000 : -1000 }}
          >
            <ul className="moneyList">
              {moneyPyradim.map((m) => (
                <li
                  key={m.id}
                  className={
                    m.id === questionNumber ? "moneyItem active" : "moneyItem"
                  }
                >
                  <span className="moneyNumber">{m.id}</span>
                  <strong className="moneyAmount">{m.amount}</strong>
                </li>
              ))}
            </ul>
          </aside>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  );
};

export default App;
