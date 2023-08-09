import React, { useEffect, useState } from "react";
import { MdModeNight } from "react-icons/md";
import { BiSolidSun } from "react-icons/bi";
import { HiMiniCodeBracket } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

interface HistoryItem {
  inputs: string;
  result: string;
}
const App = ({ inputs, result }: HistoryItem) => {
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(
    null
  );
  const [theme, setTheme] = useState<string>(getInitialTheme());
  const [historyModel, setHistoryModel] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  function getInitialTheme(): string {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  }

  const handleThemeToggle = (): void => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleButtonClick = (value: string): void => {
    setSelectedHistory(null); // Reset selectedHistory when new input is entered.
    setInput(input + value);
  };

  const handleClear = (): void => {
    setSelectedHistory(null); // Reset selectedHistory when clearing input.
    setInput("");
  };

  const handleCalculate = (): void => {
    try {
      const result = eval(input);
      setHistory([...history, { inputs, result: result.toString() }]);
      setInput(result.toString());
      setSelectedHistory(null); // Reset selectedHistory after calculation.
    } catch (error) {
      setInput("Error");
    }
  };

  const handleBackspace = (): void => {
    setSelectedHistory(null); // Reset selectedHistory when backspacing.
    setInput(input.slice(0, -1));
  };

  const handleHistoryItemClick = (item: HistoryItem): void => {
    setInput(item.inputs);
    setSelectedHistory(item);
  };

  return (
    <div className="container">
      <div className={`calculator ${theme}`}>
        <div className="heading">
          <p>Calculator</p>
          <div className="thm-btn">
            <button className="theme-toggle" onClick={handleThemeToggle}>
              {theme === "light" ? (
                <MdModeNight className="night-btn" />
              ) : (
                <BiSolidSun className="light-btn" />
              )}
            </button>
          </div>
        </div>
        <div onClick={handleClear} className="display">
          {input}
        </div>
        <div className="buttons">
          <button onClick={handleBackspace} className="clear">
            AC
          </button>
          <button className="backspace">←</button>
          <button onClick={() => handleButtonClick("%")}>%</button>
          <button
            className="operator-btn"
            onClick={() => handleButtonClick("+")}
          >
            +
          </button>
          <button onClick={() => handleButtonClick("1")}>1</button>
          <button onClick={() => handleButtonClick("2")}>2</button>
          <button onClick={() => handleButtonClick("3")}>3</button>
          <button
            className="operator-btn"
            onClick={() => handleButtonClick("-")}
          >
            -
          </button>
          <button onClick={() => handleButtonClick("4")}>4</button>
          <button onClick={() => handleButtonClick("5")}>5</button>
          <button onClick={() => handleButtonClick("6")}>6</button>
          <button
            className="operator-btn"
            onClick={() => handleButtonClick("*")}
          >
            x
          </button>
          <button onClick={() => handleButtonClick("7")}>7</button>
          <button onClick={() => handleButtonClick("8")}>8</button>
          <button onClick={() => handleButtonClick("9")}>9</button>
          <button
            className="operator-btn"
            onClick={() => handleButtonClick("/")}
          >
            /
          </button>
          <button onClick={() => setHistoryModel(true)}>
            <HiMiniCodeBracket />
          </button>
          <button onClick={() => handleButtonClick("0")}>0</button>
          <button onClick={() => handleButtonClick(".")}>.</button>

          <button className="operator-btn equal" onClick={handleCalculate}>
            =
          </button>
        </div>
        {/* --------- HISTORY------------ */}
        <div className={` ${historyModel ? "history" : "hide"}`}>
          <h2>History</h2>
          {history.map((item, index) => (
            <p
              key={index}
              className={
                selectedHistory === item
                  ? "selected history-item"
                  : "history-item"
              }
              onClick={() => {
                handleHistoryItemClick(item), setHistoryModel(false);
              }}
            >
              {item.inputs} = {item.result}
            </p>
          ))}
          <div className="close">
            <RxCross2 onClick={() => setHistoryModel(false)} />
          </div>
        </div>
        {/* --------- HISTORY------------ */}
      </div>
    </div>
  );
};

export default App;
