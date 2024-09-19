import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import '../../App.css'; // Убедитесь, что путь правильный
import ChessBoard from './ChessBoard';
import CombinedChart from './CombinedChart'; // Импортируйте новый компонент
import { simulatedAnnealing, objectiveFunction } from './SimulatedAnnealing';

Chart.register(...registerables);

const NQueens = () => {
  const [boardState, setBoardState] = useState([]);
  const [tempHistory, setTempHistory] = useState([]);
  const [errorHistory, setErrorHistory] = useState([]);
  const [bestEnergyHistory, setBestEnergyHistory] = useState([]);
  const [initialTemp, setInitialTemp] = useState(1000);
  const [minTemp, setMinTemp] = useState(0.01);
  const [coolingRate, setCoolingRate] = useState(0.99);
  const [nQueens, setNQueens] = useState(8); // Количество ферзей
  const [stepsPerTemp, setStepsPerTemp] = useState(10);
  const [maxIterations, setIterations] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);

  // Генерация пустой доски n x n
  const generateEmptyBoard = (size) => Array.from({ length: size }, () => Array(size).fill(null));

  useEffect(() => {
    // Изначально отображаем пустую доску
    setBoardState(generateEmptyBoard(nQueens));
  }, [nQueens]);

  const runSimulation = async () => {
    setIsRunning(true);
    const initialState = Array.from({ length: nQueens }, () =>
      Math.floor(Math.random() * nQueens)
    );

    await simulatedAnnealing(
      objectiveFunction,
      initialState,
      initialTemp,
      coolingRate,
      minTemp,
      stepsPerTemp,
      maxIterations,
      setBoardState,
      setTempHistory,
      setErrorHistory,
      setBestEnergyHistory
    );

    setIsRunning(false);
  };

  return (
    <div className="app">
      <h1>Simulated Annealing: N Queens Problem</h1>

      <div className="main-content">
        <div className="controls">
          <div className="control-group">
            <label>
              Начальная температура:
              <input
                type="number"
                value={initialTemp}
                onChange={(e) => setInitialTemp(parseFloat(e.target.value))}
              />
            </label>
          </div>
          <div className="control-group">
            <label>
              Минимальная температура:
              <input
                type="number"
                value={minTemp}
                onChange={(e) => setMinTemp(parseFloat(e.target.value))}
              />
            </label>
          </div>
          <div className="control-group">
            <label>
              Коэффициент охлаждения:
              <input
                type="number"
                step="0.01"
                value={coolingRate}
                onChange={(e) => setCoolingRate(parseFloat(e.target.value))}
              />
            </label>
          </div>
          <div className="control-group">
            <label>
              Количество ферзей:
              <input
                type="number"
                value={nQueens}
                onChange={(e) => setNQueens(parseInt(e.target.value))}
              />
            </label>
          </div>
          <div className="control-group">
            <label>
              Шагов на температуру:
              <input
                type="number"
                value={stepsPerTemp}
                onChange={(e) => setStepsPerTemp(parseInt(e.target.value))}
              />
            </label>
          </div>
          <div className="control-group">
            <label>
              Количество итераций:
              <input
                type="number"
                value={maxIterations}
                onChange={(e) => setIterations(parseInt(e.target.value))}
              />
            </label>
          </div>
          <button
            className="run-button"
            onClick={runSimulation}
            disabled={isRunning}
          >
            {isRunning ? 'Запуск...' : 'Запустить симуляцию'}
          </button>
        </div>

        <ChessBoard state={boardState} />
        <div className="charts">
          <CombinedChart
            tempHistory={tempHistory}
            errorHistory={errorHistory}
            bestEnergyHistory={bestEnergyHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default NQueens;
